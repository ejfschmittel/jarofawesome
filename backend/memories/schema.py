import graphene 

from graphql_jwt.decorators import login_required
from graphene_django import DjangoObjectType

from graphene_django.filter import DjangoFilterConnectionField

from random import randint
from .models import Memory, MemoryFile
import django_filters

from datetime import date, datetime, time
from graphene_file_upload.scalars import Upload


class MemoryFileType(DjangoObjectType):

    

    class Meta:
        model = MemoryFile
        fields = ('id', 'file', 'external_url')

    def resolve_file(self, info):
        print(self)
        if self.file:
            return "http://127.0.0.1:8000" + self.file.url 
        return ""

        


    




class MemoryWriteType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id','memory', 'description', 'datetime')


class MemoryNode(DjangoObjectType):
    date = graphene.Date(source='date')

    class Meta:
        model = Memory
        fields = ('id', 'memory', 'description', 'datetime')
      
        interfaces = (graphene.relay.Node,)




class MemoryFilter(django_filters.FilterSet):

    s = django_filters.CharFilter(method="filter_search")
    from_date = django_filters.CharFilter(field_name="datetime", method="filter_from_date")
    to_date = django_filters.CharFilter(field_name="datetime", method="filter_to_date")


    #order_by_date_asc = django_filters.CharFilter(field_name="datetime")
  
    order_by = django_filters.OrderingFilter(
       fields=(
           ('-datetime', 'newest'),
           ('datetime', 'oldest'),
       )
    )
    

    def filter_from_date(self, queryset, name, value):
        lookup = '__'.join([name, 'gt'])
        d = datetime.strptime(value, "%Y-%m-%d")     
        return queryset.filter(**{lookup: d})
    
    def filter_to_date(self, queryset, name, value):
        lookup = '__'.join([name, 'lt'])
        d = datetime.combine(datetime.strptime(value, "%Y-%m-%d")  , time.max)
        return queryset.filter(**{lookup: d})

    def filter_search(self, queryset, name, value):
        lookup = '__'.join(["memory", 'icontains'])
        # extends search lookup to description / etc
        return queryset.filter(**{lookup: value})

    class Meta:
        model = Memory
        fields = ['memory', 'datetime']



class MemoryReadType(DjangoObjectType):
    date = graphene.Date(source='date')

    class Meta:
        model = Memory
        fields = ('id', 'memory', 'description')




class MemoryInput(graphene.InputObjectType):
    id = graphene.UUID(required=True)
    memory = graphene.String(required=False)
    description = graphene.String(required=False)
      

class Query(object):
    memory = graphene.Field(MemoryReadType, id=graphene.UUID())
    all_memories = DjangoFilterConnectionField(MemoryNode, filterset_class=MemoryFilter)
    random_memory = graphene.Field(MemoryReadType)
    recent_memories = graphene.List(MemoryReadType)

    memory_files = graphene.List(MemoryFileType, id=graphene.UUID())
    
    @login_required
    def resolve_all_memories(self, info, **kwargs):
        user = user = info.context.user
        return Memory.objects.filter(user=user)
    

    @login_required
    def resolve_memory_files(self, info, id):
        user = info.context.user
        memory = Memory.objects.get(pk=id)
  
        if user == memory.user:
           return MemoryFile.objects.filter(memory=id)
        return None
   
    @login_required
    def resolve_recent_memories(self, info, **kwargs):
        print("recent memories")
        user = info.context.user
        return Memory.objects.filter(user=user).order_by("-datetime")[:10]

    @login_required
    def resolve_random_memory(self, info, **kwargs):
        user = user = info.context.user
        count = Memory.objects.filter(user=user).count()
        if count != 0:
            return Memory.objects.filter(user=user)[randint(0, count-1)]
        return None

    def resolve_memory(self, info, **kwargs):
        user = user = info.context.user

        item = None
        id = kwargs.get("id")
        if id is not None:
            item = Memory.objects.get(pk=id)
  
        print(user)
        if user and user == item.user:
            return item
        return None

class CreateMemory(graphene.Mutation):
    memory = graphene.Field(MemoryReadType)

    class Arguments:
        memory = graphene.String(required=True)
    
    @login_required
    def mutate(self, info, memory):
        user = info.context.user
        item=Memory.objects.create(
            memory=memory,
            user=user
        )
        return CreateMemory(memory=item)




class UpdateMemory(graphene.Mutation):
    memory = graphene.Field(MemoryReadType)

    class Arguments:
       data = MemoryInput(required=True)

    @login_required
    def mutate(self, info, data):
        user = info.context.user

        memory = Memory.objects.get(pk=data.id)

        for k, v in data.items():
            if k == "memory" and v != "":
                setattr(memory, k, v)
            else:
                setattr(memory, k, v)


        print(memory)
        try:
            memory.full_clean()
            memory.save()
            return UpdateMemory(memory=memory)
        except:
            return UpdateMemory(memory=memory)



class CreateMemoryMedia(graphene.Mutation):
    memoryFile = graphene.Field(MemoryFileType)

    class Arguments:
        id = graphene.UUID(required=True)
        external_url = graphene.String(required=False)
        file = Upload(required=False)

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user

        print(kwargs.get("id"))
        memory = Memory.objects.get(pk=kwargs.get("id"))
        external_url = kwargs.get("external_url")
        file = kwargs.get("file")
        print(kwargs)
        print(kwargs.get("id"))

        print(kwargs.get("file"))

        print(info.context.FILES)

        print(external_url)

        if user and user == memory.user:
            # check if either file or external url exists
            memoryFile = MemoryFile.objects.create(
                external_url=external_url,
                file=file,
                memory=memory
            )

            return CreateMemoryMedia(memoryFile=memoryFile)
        
        return None


class DeleteMemoryMedia(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.UUID()

    @login_required
    def mutate(self, info, **kwargs):
        id = kwargs.get("id")
        user = info.context.user
        memoryfile = MemoryFile.objects.get(pk=id)
        if user and user == memoryfile.memory.user:
            memoryfile.delete()
            return DeleteMemoryMedia(ok=True)
        return DeleteMemoryMedia(ok=False)


class Mutation(graphene.ObjectType):
    create_memory = CreateMemory.Field()
    update_memory = UpdateMemory.Field()

    create_memory_file = CreateMemoryMedia.Field()
    delete_memory_file = DeleteMemoryMedia.Field()
    

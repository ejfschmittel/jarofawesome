import graphene 
from graphql_jwt.decorators import login_required
from graphene_django import DjangoObjectType

from random import randint
from .models import Memory

class MemoryWriteType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id','memory', 'description', 'datetime')

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
    memory = graphene.Field(MemoryWriteType, id=graphene.UUID())
    all_memories = graphene.List(MemoryReadType)
    random_memory = graphene.Field(MemoryReadType)
    recent_memories = graphene.List(MemoryReadType)


    @login_required
    def resolve_all_memories(self, info, **kwargs):
        user = user = info.context.user
        return Memory.objects.filter(user=user)

    @login_required
    def resolve_recent_memories(self, info, **kwargs):
        user = user = info.context.user
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


class Mutation(graphene.ObjectType):
    create_memory = CreateMemory.Field()
    update_memory = UpdateMemory.Field()
    

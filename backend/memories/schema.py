import graphene 
from graphql_jwt.decorators import login_required
from graphene_django import DjangoObjectType
from random import randint
from .models import Memory

class MemoryType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id','memory', 'description', 'date')

class Query(object):
    memory = graphene.Field(MemoryType, id=graphene.UUID())
    all_memories = graphene.List(MemoryType)
    random_memory = graphene.Field(MemoryType)
    recent_memories = graphene.List(MemoryType)


    def resolve_all_memories(self, info, **kwargs):
        return Memory.objects.all();

    @login_required
    def resolve_recent_memories(self, info, **kwargs):
        user = user = info.context.user
        return Memory.objects.filter(user=user).order_by("-date")[:10]

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
    memory = graphene.Field(MemoryType)

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

class Mutation(graphene.ObjectType):
    create_memory = CreateMemory.Field()
    

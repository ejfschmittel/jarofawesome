import graphene 
from graphql_jwt.decorators import login_required
from graphene_django import DjangoObjectType
from random import randint
from .models import Memory

class MemoryType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id','memory', 'description')

class Query(object):
    memory = graphene.Field(MemoryType, id=graphene.Int())
    all_memories = graphene.List(MemoryType)
    random_memory = graphene.Field(MemoryType)

    def resolve_all_memories(self, info, **kwargs):
        return Memory.objects.all();

    @login_required
    def resolve_random_memory(self, info, **kwargs):
        user = user = info.context.user
        count = Memory.objects.filter(user=user).count()
        if count != 0:
            return Memory.objects.filter(user=user)[randint(0, count-1)]
        return None

    def resolve_memory(self, info, **kwargs):
        id = kwargs.get("id")

        if id is not None:
            return Memory.objects.get(pk=id)

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
    

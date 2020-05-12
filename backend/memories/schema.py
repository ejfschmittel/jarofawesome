import graphene 
from graphene_django.types import DjangoObjectType

from .models import Memory

class MemoryType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id','memory', 'description')

class Query(object):
    memory = graphene.Field(MemoryType, id=graphene.Int())
    all_memories = graphene.List(MemoryType)

    def resolve_all_memories(self, info, **kwargs):
        return Memory.objects.all();

    def resolve_memory(self, info, **kwargs):
        id = kwargs.get("id")

        if id is not None:
            return Memory.objects.get(pk=id)

        return None
'''
class MemoryMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    category = graphene.Field(CategoryType)

    def mutate(self, info, name):
        category = Category.objects.create(name=name)
        category.save()
        return CategoryMutation(category=category)

class Mutation(graphene.ObjectType):
    create_category = CategoryMutation.Field()'''
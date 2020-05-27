import graphene 
from graphene_django.filter import DjangoFilterConnectionField
from random import randint
from graphql_jwt.decorators import login_required

from ..models import Memory, MemoryFile
from .types import MemoryReadType, MemoryNode, MemoryFileType
from .filters import MemoryFilter



class MemoryQuery(object):
    memory = graphene.Field(MemoryReadType, id=graphene.UUID())
    all_memories = DjangoFilterConnectionField(MemoryNode, filterset_class=MemoryFilter)
    random_memory = graphene.Field(MemoryReadType)
    recent_memories = graphene.List(MemoryReadType)

    def resolve_memory(self, info, **kwargs):
        user = user = info.context.user

        item = None
        id = kwargs.get("id")
        if id is not None:
            item = Memory.objects.get(pk=id)

        if user and user == item.user:
            return item
        return None

    @login_required
    def resolve_all_memories(self, info, **kwargs):
        user = user = info.context.user
        return Memory.objects.filter(user=user)

    @login_required
    def resolve_random_memory(self, info, **kwargs):
        user = user = info.context.user
        count = Memory.objects.filter(user=user).count()
        if count != 0:
            return Memory.objects.filter(user=user)[randint(0, count-1)]
        return None

    @login_required
    def resolve_recent_memories(self, info, **kwargs):
        user = info.context.user
        return Memory.objects.filter(user=user).order_by("-datetime")[:10]


class MemoryFileQuery(object):
    memory_files = graphene.List(MemoryFileType, id=graphene.UUID())

    @login_required
    def resolve_memory_files(self, info, id):
        user = info.context.user
        memory = Memory.objects.get(pk=id)
  
        if user == memory.user:
           return MemoryFile.objects.filter(memory=id)
        return None


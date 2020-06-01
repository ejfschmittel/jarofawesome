import graphene 
from graphene_django.filter import DjangoFilterConnectionField
from random import randint
from graphql_jwt.decorators import login_required

from ..models import Memory, MemoryFile, MemoryShareLink
from .types import MemoryReadType, MemoryNode, MemoryFileType, MemoryShareLinkType, MemoryLinkUrlType
from .filters import MemoryFilter



class MemoryQuery(object):
    memory = graphene.Field(MemoryReadType, id=graphene.UUID(), hash_key=graphene.String(required=False))
    all_memories = DjangoFilterConnectionField(MemoryNode, filterset_class=MemoryFilter)
    random_memory = graphene.Field(MemoryReadType)
    recent_memories = graphene.List(MemoryReadType)

    def resolve_memory(self, info, **kwargs):
        user = user = info.context.user
        item = None
        id = kwargs.get("id")
        hash_key = kwargs.get("hash_key")
        
        item = Memory.objects.get(pk=id)

        if not item:
            return None

        # return memory if user is owner of the memory
        if user and user == item.user:
            return item
        
        # return item if valid hash_key for sharing is given
        if hash_key and item.memory_share_link.hash_key == hash_key:
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
        return Memory.objects.filter(user=user).order_by("-created_at")[:10]


class MemoryFileQuery(object):
    memory_files = graphene.List(MemoryFileType, id=graphene.UUID(), hash_key=graphene.String(required=False))


    def resolve_memory_files(self, info, id, **kwargs):
        print("hello")
        user = info.context.user
        memory = Memory.objects.get(pk=id)
        hash_key = kwargs.get("hash_key")
        print(user)
        print(memory)

        if memory and user == memory.user:
           return MemoryFile.objects.filter(memory=id)

        if memory and hash_key and memory.memory_share_link.hash_key == hash_key:
            return MemoryFile.objects.filter(memory=id) 

        return None


class MemoryShareLinkQuery(object):
    memory_share_link = graphene.Field(MemoryShareLinkType)
    memory_share_link_resolve = graphene.Field(MemoryLinkUrlType, hash_key=graphene.String())

    def resolve_memory_share_link(self, info, id):
        memory_share_link = MemoryShareLink.objects.get(pk=id)
        return memory_share_link
    

    def resolve_memory_share_link_resolve(self, info, hash_key):
        if hash_key:
            try:
                share_link = MemoryShareLink.objects.get(hash_key=hash_key)
                memory = Memory.objects.get(pk=share_link.memory.id)
                return MemoryLinkUrlType(memory_id=memory.id, memory_share_link=share_link)
            except:
                pass
        return None

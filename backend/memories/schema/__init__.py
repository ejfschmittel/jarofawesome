import graphene
from .mutations import CreateMemory,UpdateMemory, CreateMemoryMedia, DeleteMemoryMedia, GetOrCreateShareLink, DeleteMemory
from .queries import MemoryFileQuery, MemoryQuery, MemoryShareLinkQuery

class Query(MemoryFileQuery, MemoryQuery, MemoryShareLinkQuery, graphene.ObjectType):
    pass


class Mutation(graphene.ObjectType):
    create_memory = CreateMemory.Field()
    update_memory = UpdateMemory.Field()
    delete_memory = DeleteMemory.Field()

    create_memory_file = CreateMemoryMedia.Field()
    delete_memory_file = DeleteMemoryMedia.Field()
    get_or_create_share_link = GetOrCreateShareLink.Field()
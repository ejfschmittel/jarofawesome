import graphene
from graphene_file_upload.scalars import Upload
from graphql_jwt.decorators import login_required

from ..models import Memory, MemoryFile
from .types import MemoryReadType, MemoryFileType
from .inputs import MemoryInput


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

        # either file or external url must exists otherwise throw error
        if not file and not external_url:
            pass


        if user and user == memory.user:
            # check if either file or external url exists
            memoryFile = MemoryFile.objects.create(
                external_url=external_url,
                file=file,
                memory=memory
            )

            return CreateMemoryMedia(memoryFile=memoryFile)
        
        return CreateMemoryMedia()

class DeleteMemoryMedia(graphene.Mutation):
    ok = graphene.Boolean()
    memory_id = graphene.UUID()
    memory_file_id = graphene.UUID()

    class Arguments:
        id = graphene.UUID()

    @login_required
    def mutate(self, info, **kwargs):
        id = kwargs.get("id")
        user = info.context.user
        memoryfile = MemoryFile.objects.get(pk=id)
        memory_id = memoryfile.memory.id

        if user and user == memoryfile.memory.user:
            memoryfile.delete()
            return DeleteMemoryMedia(ok=True, memory_id=memory_id, memory_file_id=id)
        return DeleteMemoryMedia(ok=False, memory_id=memory_id, memory_file_id=id)
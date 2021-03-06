import graphene
from graphene_file_upload.scalars import Upload
from graphql_jwt.decorators import login_required
from django.core.exceptions import ValidationError

from ..models import Memory, MemoryFile, MemoryShareLink
from .types import MemoryReadType, MemoryFileType, MemoryShareLinkType
from .inputs import MemoryInput

from ..utils.exteral_url_validator import validate_external_url
from ..utils.file_validator import FileValidator



class CreateMemory(graphene.Mutation):
    memory = graphene.Field(MemoryReadType)

    class Arguments:
        memory = graphene.String(required=True)
        date = graphene.Date(required=False)
    
    @login_required
    def mutate(self, info, memory, **kwargs):
        user = info.context.user
        date = kwargs.get("date")

        create_args = {
            "memory": memory,
            "user": user,
        }

        if date:
            create_args["memory_date"] = date
            
        item = Memory.objects.create(**create_args)

        return CreateMemory(memory=item)

class DeleteMemory(graphene.Mutation):
    ok = graphene.Boolean()
    memory_id = graphene.UUID()

    class Arguments:
        id = graphene.UUID(required=True)
    
    @login_required
    def mutate(self, info, id):
        user = info.context.user
        memory = Memory.objects.get(pk=id)
        memory_id = memory.id

        if memory and memory.user == user:
            memory.delete()
            return DeleteMemory(ok=True, memory_id=memory_id)

        return CreateMemory(ok=False)

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

        # if both were sent error 
        if file and external_url:
            print("both error")
        
        if user and user == memory.user:
            # check if file or external url 

            # check if file

            media_type = None

            try:
                if external_url:
                    media_type = validate_external_url(external_url)

                if file:
                    
                    validate_file = FileValidator(max_size=1024 * 10000, 
                                content_types=(
                                    'image/jpeg',
                                    'image/gif',
                                    'audio/mpeg',
                                    'video/mpeg'

                                    ))
                    res = validate_file(file)
                    media_type = res.split("/")[0]
            except ValidationError as e:
                print(e)

            if not media_type:
                pass

            print(media_type)
            
            memoryFile = MemoryFile.objects.create(
                external_url=external_url,
                file=file,
                memory=memory,
                media_type=media_type
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


class GetOrCreateShareLink(graphene.Mutation):
    memory_share_link = graphene.Field(MemoryShareLinkType)

    class Arguments:
        memory_id = graphene.UUID()

    @login_required
    def mutate(self, info, memory_id):
        user = info.context.user
        
        memory = Memory.objects.get(pk=memory_id)
        if memory and user and user == memory.user:
            obj, created = MemoryShareLink.objects.get_or_create(memory=memory)
            return GetOrCreateShareLink(memory_share_link=obj)
        return GetOrCreateShareLink()
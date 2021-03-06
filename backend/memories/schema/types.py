import graphene 
from graphene_django import DjangoObjectType

from ..models import Memory, MemoryFile, MemoryShareLink

'''
TODO: 
- dynamically type resolve ulr for memory file type

'''


class MemoryFileType(DjangoObjectType):
    class Meta:
        model = MemoryFile
        fields = ('id', 'file', 'external_url', 'media_type')

    def resolve_file(self, info):
        print(self)
        if self.file:
            return "http://127.0.0.1:8000" + self.file.url 
        return ""



class MemoryShareLinkType(DjangoObjectType):
    class Meta:
        model = MemoryShareLink
        fields = ('id', 'created_at','clicks', 'memory', 'hash_key')

class MemoryLinkUrlType(graphene.ObjectType):
    memory_id = graphene.UUID()
    memory_share_link = graphene.Field(MemoryShareLinkType)

class MemoryWriteType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id','memory', 'description', 'created_at')



class MemoryReadType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id', 'memory', 'description', 'created_at', 'memory_date')


class MemoryNode(DjangoObjectType):
    date = graphene.Date(source='date')
    pk = graphene.UUID(source='pk')

    class Meta:
        model = Memory
        fields = ('id', 'memory', 'description', 'created_at', 'memory_date')
      
        interfaces = (graphene.relay.Node,)

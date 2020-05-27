import graphene 
from graphene_django import DjangoObjectType

from ..models import Memory, MemoryFile

'''
TODO: 
- dynamically type resolve ulr for memory file type

'''


class MemoryFileType(DjangoObjectType):
    class Meta:
        model = MemoryFile
        fields = ('id', 'file', 'external_url')

    def resolve_file(self, info):
        print(self)
        if self.file:
            return "http://127.0.0.1:8000" + self.file.url 
        return ""


class MemoryWriteType(DjangoObjectType):
    class Meta:
        model = Memory
        fields = ('id','memory', 'description', 'datetime')



class MemoryReadType(DjangoObjectType):
    date = graphene.Date(source='date')

    class Meta:
        model = Memory
        fields = ('id', 'memory', 'description')


class MemoryNode(DjangoObjectType):
    date = graphene.Date(source='date')

    class Meta:
        model = Memory
        fields = ('id', 'memory', 'description', 'datetime')
      
        interfaces = (graphene.relay.Node,)

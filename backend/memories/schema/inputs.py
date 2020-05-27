import graphene 


class MemoryInput(graphene.InputObjectType):
    id = graphene.UUID(required=True)
    memory = graphene.String(required=False)
    description = graphene.String(required=False)
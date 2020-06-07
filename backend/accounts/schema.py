from django.contrib.auth import get_user_model
import graphene
from graphql import GraphQLError
from graphene_django import DjangoObjectType
from graphene_django.forms.mutation import DjangoModelFormMutation
import graphql_jwt

from .forms import SignUpForm

User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    me = graphene.Field(UserType)

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            return None;
        return user

    def resolve_users(self, info):
        return User.objects.all()

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, email, username, password):
        print(username)
        print(email)

        user = User.objects.create(
            username=username,
            email=email
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


 

class SignUpUser(DjangoModelFormMutation):
    user = graphene.Field(UserType)
    class Meta:
        form_class = SignUpForm
        return_field_name = 'user'



class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    sign_up_user = SignUpUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()
    #delete_refresh_token_cookie = graphql_jwt.refresh_token.DeleteRefreshTokenCookie.Field()
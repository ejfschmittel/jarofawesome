import django_filters
from datetime import date, datetime, time

from ..models import Memory

class MemoryFilter(django_filters.FilterSet):

    s = django_filters.CharFilter(method="filter_search")
    from_date = django_filters.CharFilter(field_name="datetime", method="filter_from_date")
    to_date = django_filters.CharFilter(field_name="datetime", method="filter_to_date")


    #order_by_date_asc = django_filters.CharFilter(field_name="datetime")
  
    order_by = django_filters.OrderingFilter(
       fields=(
           ('-datetime', 'newest'),
           ('datetime', 'oldest'),
       )
    )
    

    def filter_from_date(self, queryset, name, value):
        lookup = '__'.join([name, 'gt'])
        d = datetime.strptime(value, "%Y-%m-%d")     
        return queryset.filter(**{lookup: d})
    
    def filter_to_date(self, queryset, name, value):
        lookup = '__'.join([name, 'lt'])
        d = datetime.combine(datetime.strptime(value, "%Y-%m-%d")  , time.max)
        return queryset.filter(**{lookup: d})

    def filter_search(self, queryset, name, value):
        lookup = '__'.join(["memory", 'icontains'])
        # extends search lookup to description / etc
        return queryset.filter(**{lookup: value})

    class Meta:
        model = Memory
        fields = ['memory', 'datetime']

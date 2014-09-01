# coding: utf-8
from django.conf.urls import patterns, include, url

urlpatterns = patterns('api.views',
    url(r'^$', 'api', name='api'),
    url(r'^reviews/$', 'reviews', name='reviews'),
    url(r'^reviews/(?P<username>[^/]+)/(?P<review_name>[^/]+)/$', 'review', name='review'),
)
# coding: utf-8
from django.conf.urls import patterns, include, url

urlpatterns = patterns('reviews.views',
    url(r'^new/$', 'new', name='new'),
    url(r'^add_author_to_review/$', 'add_author_to_review', name='add_author_to_review'),
    url(r'^add_author/$', 'add_author', name='add_author'),
    url(r'^remove_author/$', 'remove_author_from_review', name='remove_author_from_review'),
    url(r'^save_description/$', 'save_description', name='save_description'),
    url(r'^planning/', include('reviews.planning.urls', namespace='planning')),
    url(r'^conducting/', include('reviews.conducting.urls', namespace='conducting')),
    url(r'^reporting/', include('reviews.reporting.urls', namespace='reporting')),
)
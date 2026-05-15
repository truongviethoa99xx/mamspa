<?php

it('responds to the health endpoint', function () {
    $this->get('/up')->assertOk();
});

it('serves the sitemap', function () {
    $this->get('/sitemap.xml')
        ->assertOk()
        ->assertHeader('Content-Type', 'application/xml');
});

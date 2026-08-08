<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Node binary cho SSR (App\Support\Ssr\ProcessGateway)
    |--------------------------------------------------------------------------
    |
    | ProcessGateway spawn 1 tiến trình node cho mỗi request để render SSR
    | (hosting cPanel không chạy được tiến trình Node nền liên tục). PATH của
    | user chạy PHP-FPM trên cPanel thường KHÔNG có `node` — cần set biến môi
    | trường INERTIA_SSR_NODE_BINARY thành đường dẫn tuyệt đối, ví dụ:
    |   INERTIA_SSR_NODE_BINARY=/opt/cpanel/ea-nodejs20/bin/node
    | (kiểm tra đường dẫn thật bằng `which node` trong Terminal cPanel).
    |
    */

    'node_binary' => env('INERTIA_SSR_NODE_BINARY', 'node'),

];

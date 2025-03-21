<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn() => response()->json(['message' => 'Welcome to API'], 200));

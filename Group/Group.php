<?php

namespace Libbit\YuiBundle\Group;

class Group
{
    public $name;

    public $pattern;

    public $base;

    public $root;

    public function __construct($name = null, $pattern = null, $base = null, $root = null)
    {
        $this->name    = $name;
        $this->pattern = $pattern;
        $this->base    = $base;
        $this->root    = $root;
    }
}
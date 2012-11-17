<?php

namespace Libbit\YuiBundle\Group;

class Group
{
    public $filter;

    public $pattern;

    public $base;

    public $root;

    public function __construct($filter = null, $pattern = null, $base = null, $root = null)
    {
        $this->filter  = $filter;
        $this->pattern = $pattern;
        $this->base    = $base;
        $this->root    = $root;
    }
}
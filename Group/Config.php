<?php

namespace Libbit\YuiBundle\Group;

use Symfony\Component\DependencyInjection\ContainerInterface;

class Config
{
    protected $container;

    protected $groups;

    public function __construct(ContainerInterface $container, array $groupServiceIds)
    {
        $this->container = $container;

        foreach ($groupServiceIds as $alias => $serviceId) {
            $this->groups[$alias] = $this->container->get($serviceId);
        }
    }

    public function getGroups()
    {
        return $this->groups;
    }

    public function getByPath($path)
    {
        $groups = $this->groups;

        foreach ($groups as $group) {
            $pattern = $group->pattern;
            $root    = $group->root;

            if (substr($path, strlen($root), strlen($pattern)) === $pattern) {
               return $group;
            }
        }

        return null;
    }
}
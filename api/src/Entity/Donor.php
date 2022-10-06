<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use App\Repository\DonorRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

//#[ApiResource(mercure: true)]
#[ApiResource]
#[ORM\Entity(repositoryClass: DonorRepository::class)]
class Donor
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type:'text')]
    private ?string $name = null;

    #[ORM\Column(type:'text')]
    #[Assert\Email]
    private ?string $email = null;

    //#[ORM\Column(type:'text')]
    //private ?string $status = null;

    #[ORM\OneToMany(targetEntity: Donation::class, mappedBy: 'donor', cascade:['persist', 'remove'])]
    public iterable $donations;

    public function __construct()
    {
        //$this->donations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
}

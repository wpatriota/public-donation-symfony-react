<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use App\Repository\DonationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

//#[ApiResource(mercure: true)]
#[ApiResource]
#[ORM\Entity(repositoryClass: DonationRepository::class)]
class Donation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $donation_value = null;

    #[ORM\Column(type:'text')]
    private ?string $payment = null;

    #[ORM\ManyToOne(inversedBy:'donations')]
    //#[Assert\NotNull]
    public ?Donor $donor = null;

    //#[ORM\OneToMany(targetEntity: InstallmentsDonation::class, mappedBy: 'Donation')]
    //public $installmentsDonations;

    /*public function __construct()
    {
        $this->installmentsDonations = new ArrayCollection();
    }*/

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDonationValue(): ?float
    {
        return $this->donation_value;
    }

    public function setDonationValue(float $donation_value): self
    {
        $this->donation_value = $donation_value;

        return $this;
    }

    public function getPayment(): ?string
    {
        return $this->payment;
    }

    public function setPayment(string $payment): self
    {
        $this->payment = $payment;

        return $this;
    }
}

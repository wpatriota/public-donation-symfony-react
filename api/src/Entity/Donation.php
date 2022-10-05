<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\DonationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: DonationRepository::class)]
class Donation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $donation_value = null;

    #[ORM\Column(length: 255)]
    private ?string $payment = null;

    #[ORM\ManyToOne(inversedBy:'donor')]
    #[Assert\NotNull]
    public ?Donor $donor = null;

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

<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\InstallmentsDonationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(mercure: true)]
#[ORM\Entity(repositoryClass: InstallmentsDonationRepository::class)]
class InstallmentsDonation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?float $amount_paid = null;

    #[ORM\Column(length: 255)]
    private ?string $payment = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy:'donation')]
    #[Assert\NotNull]
    public ?Donation $donation = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAmountPaid(): ?float
    {
        return $this->amount_paid;
    }

    public function setAmountPaid(float $amount_paid): self
    {
        $this->amount_paid = $amount_paid;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }
}

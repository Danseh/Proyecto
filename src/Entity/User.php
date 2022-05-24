<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get' => [
            'method' => 'get',
            'normalization_context' => ['groups' => ['infoUser']],
        ],
    ],
    itemOperations: [
        'get' => [
            'method' => 'get',
            'normalization_context' => ['groups' => ['infoUserIndividual']],
        ],
    ],
)]
#[UniqueEntity(fields: ['username'], message: 'There is already an account with this username')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[Groups(['infoUser'])]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups(['infoUser', 'infoUserIndividual'])]
    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private $username;

    #[Groups(['infoUser'])]
    #[ORM\Column(type: 'json')]
    private $roles = [];

    #[ORM\Column(type: 'string')]
    private $password;

    #[Groups(['infoUser'])]
    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Piso::class)]
    private $pisosPublicados;

    #[Groups(['infoUser'])]
    #[ORM\ManyToMany(targetEntity: Piso::class, mappedBy: 'miembros')]
    private $pisos;

    #[Groups(['infoUserIndividual'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $informacion;

    #[Groups(['infoUserIndividual'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $gustos;

    #[Groups(['infoUserIndividual'])]
    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private $sexo;

    #[Groups(['infoUserIndividual'])]
    #[ORM\Column(type: 'integer', nullable: true)]
    private $edad;

    #[Groups(['infoUserIndividual'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $foto;

    public function __construct()
    {
        $this->pisosPublicados = new ArrayCollection();
        $this->pisos = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): self
    {
        $this->username = $username;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->username;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Piso>
     */
    public function getPisosPublicados(): Collection
    {
        return $this->pisosPublicados;
    }

    public function addPisosPublicado(Piso $pisosPublicado): self
    {
        if (!$this->pisosPublicados->contains($pisosPublicado)) {
            $this->pisosPublicados[] = $pisosPublicado;
            $pisosPublicado->setOwner($this);
        }

        return $this;
    }

    public function removePisosPublicado(Piso $pisosPublicado): self
    {
        if ($this->pisosPublicados->removeElement($pisosPublicado)) {
            // set the owning side to null (unless already changed)
            if ($pisosPublicado->getOwner() === $this) {
                $pisosPublicado->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Piso>
     */
    public function getPisos(): Collection
    {
        return $this->pisos;
    }

    public function addPiso(Piso $piso): self
    {
        if (!$this->pisos->contains($piso)) {
            $this->pisos[] = $piso;
            $piso->addMiembro($this);
        }

        return $this;
    }

    public function removePiso(Piso $piso): self
    {
        if ($this->pisos->removeElement($piso)) {
            $piso->removeMiembro($this);
        }

        return $this;
    }

    public function getInformacion(): ?string
    {
        return $this->informacion;
    }

    public function setInformacion(?string $informacion): self
    {
        $this->informacion = $informacion;

        return $this;
    }

    public function getGustos(): ?string
    {
        return $this->gustos;
    }

    public function setGustos(?string $gustos): self
    {
        $this->gustos = $gustos;

        return $this;
    }

    public function getSexo(): ?string
    {
        return $this->sexo;
    }

    public function setSexo(?string $sexo): self
    {
        $this->sexo = $sexo;

        return $this;
    }

    public function getEdad(): ?int
    {
        return $this->edad;
    }

    public function setEdad(?int $edad): self
    {
        $this->edad = $edad;

        return $this;
    }

    public function getFoto(): ?string
    {
        return $this->foto;
    }

    public function setFoto(string $foto): self
    {
        $this->foto = $foto;

        return $this;
    }
}

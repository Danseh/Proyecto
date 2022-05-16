<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PisoRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;

#[ORM\Entity(repositoryClass: PisoRepository::class)]

#[ApiResource(    
    collectionOperations: [
        'get' => [
            'method' => 'get',
            'normalization_context' => ['groups' => ['infoPisos']],
        ],
        'post' => [
            'path' => 'pisosPublicados',
            'denormalization_context' => ['groups' => ['crearPiso']],
            'security' => 'is_granted("ROLE_USER")'
        ],
    ],
    itemOperations: [
        'get' => [
            'method' => 'get',
            'normalization_context' => ['groups' => ['infoPisoIndividual']],
        ],
    ],
)]

#[ApiFilter(SearchFilter::class, properties: ['ubicacion' => 'partial'])]
class Piso
{
    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[Groups(['crearPiso', 'infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $titulo;

    #[Groups(['crearPiso', 'infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $Descripcion;

    #[ORM\Column(type: 'date', nullable: true)]
    private $fechaPublicacion;

    #[Groups(['crearPiso', 'infoPisos', 'infoPisoIndividual'])]
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'pisosPublicados')]
    private $owner;

    #[Groups(['infoPisoIndividual'])]
    #[ORM\ManyToMany(targetEntity: user::class, inversedBy: 'pisos')]
    private $miembros;

    #[Groups(['crearPiso', 'infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $Ciudad;

    #[Groups(['crearPiso', 'infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $direccion;

    public function __construct()
    {
        $this->miembros = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitulo(): ?string
    {
        return $this->titulo;
    }

    public function setTitulo(string $titulo): self
    {
        $this->titulo = $titulo;

        return $this;
    }

    public function getUbicacion(): ?string
    {
        return $this->Ubicacion;
    }

    public function setUbicacion(?string $Ubicacion): self
    {
        $this->Ubicacion = $Ubicacion;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->Descripcion;
    }

    public function setDescripcion(?string $Descripcion): self
    {
        $this->Descripcion = $Descripcion;

        return $this;
    }

    public function getFechaPublicacion(): ?\DateTimeInterface
    {
        return $this->fechaPublicacion;
    }

    public function setFechaPublicacion(?\DateTimeInterface $fechaPublicacion): self
    {
        $this->fechaPublicacion = $fechaPublicacion;

        return $this;
    }

    public function getOwner(): ?user
    {
        return $this->owner;
    }

    public function setOwner(?user $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    /**
     * @return Collection<int, user>
     */
    public function getMiembros(): Collection
    {
        return $this->miembros;
    }

    public function addMiembro(user $miembro): self
    {
        if (!$this->miembros->contains($miembro)) {
            $this->miembros[] = $miembro;
        }

        return $this;
    }

    public function removeMiembro(user $miembro): self
    {
        $this->miembros->removeElement($miembro);

        return $this;
    }

    public function getCiudad(): ?string
    {
        return $this->Ciudad;
    }

    public function setCiudad(string $Ciudad): self
    {
        $this->Ciudad = $Ciudad;

        return $this;
    }

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(string $direccion): self
    {
        $this->direccion = $direccion;

        return $this;
    }
}

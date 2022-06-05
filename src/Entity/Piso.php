<?php

namespace App\Entity;

use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PisoRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: PisoRepository::class)]

#[ApiResource(    
    attributes: ["pagination_items_per_page" => 8],
    collectionOperations: [
        'get' => [
            'method' => 'get',
            'normalization_context' => ['groups' => ['infoPisos']],
        ],
    ],
    itemOperations: [
        'get' => [
            'method' => 'get',
            'normalization_context' => ['groups' => ['infoPisoIndividual']],
        ],
    ],
)]
/** 
* @ApiFilter(SearchFilter::class, properties={"ciudad": "exact", "owner": "exact"})
*/



#[ApiFilter(OrderFilter::class, properties: ['precio'], arguments: ['orderParameterName' => 'order'])]


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
    private $descripcion;

    #[ORM\Column(type: 'date', nullable: true)]
    private $fechaPublicacion;

    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'pisosPublicados')]
    private $owner;

    #[Groups(['crearPiso', 'infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $direccion;

    #[Groups(['crearPiso', 'infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'string', length: 255)]
    private $ciudad;

    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'array', nullable: true)]
    private $imagenes = [];

    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'integer', nullable: true)]
    private $precio;

    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'integer')]
    private $plazas;

    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'string', length: 20)]
    private $estado;

    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\Column(type: 'date', nullable: true)]
    private $fechaDisponible;

    #[Groups(['infoPisos', 'infoPisoIndividual'])]
    #[ORM\OneToMany(mappedBy: 'piso', targetEntity: User::class)]
    private $miembros;

    #[Groups(['infoPisoIndividual'])]
    #[ORM\ManyToMany(targetEntity: User::class, inversedBy: 'pisosInteresado')]
    private $interesados;

    public function __construct()
    {
        $this->miembros = new ArrayCollection();
        $this->interesados = new ArrayCollection();
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

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(?string $descripcion): self
    {
        $this->descripcion = $descripcion;

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

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(string $direccion): self
    {
        $this->direccion = $direccion;

        return $this;
    }

    public function getCiudad(): ?string
    {
        return $this->ciudad;
    }

    public function setCiudad(string $ciudad): self
    {
        $this->ciudad = $ciudad;

        return $this;
    }

    public function getImagenes(): ?array
    {
        return $this->imagenes;
    }

    public function setImagenes(array $imagenes): self
    {
        $this->imagenes = $imagenes;

        return $this;
    }

    public function addImagen(String $imagen): self
    {
        if (!in_array($imagen, $this->imagenes)) {
            $this->imagenes[] = $imagen;
        }

        return $this;
    }

    public function removeImagen(String $imagen): self
    {
        $this->imagenes->removeElement($imagen);

        return $this;
    }

    public function getPrecio(): ?int
    {
        return $this->precio;
    }

    public function setPrecio(?int $precio): self
    {
        $this->precio = $precio;

        return $this;
    }

    public function getPlazas(): ?int
    {
        return $this->plazas;
    }

    public function setPlazas(int $plazas): self
    {
        $this->plazas = $plazas;

        return $this;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getFechaDisponible(): ?\DateTimeInterface
    {
        return $this->fechaDisponible;
    }

    public function setFechaDisponible(?\DateTimeInterface $fechaDisponible): self
    {
        $this->fechaDisponible = $fechaDisponible;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getMiembros(): Collection
    {
        return $this->miembros;
    }

    public function addMiembro(User $miembro): self
    {
        if (!$this->miembros->contains($miembro)) {
            $this->miembros[] = $miembro;
            $miembro->setPiso($this);
        }

        return $this;
    }

    public function removeMiembro(User $miembro): self
    {
        if ($this->miembros->removeElement($miembro)) {
            // set the owning side to null (unless already changed)
            if ($miembro->getPiso() === $this) {
                $miembro->setPiso(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getInteresados(): Collection
    {
        return $this->interesados;
    }

    public function addInteresado(User $interesado): self
    {
        if (!$this->interesados->contains($interesado)) {
            $this->interesados[] = $interesado;
        }

        return $this;
    }

    public function removeInteresado(User $interesado): self
    {
        $this->interesados->removeElement($interesado);

        return $this;
    }
}

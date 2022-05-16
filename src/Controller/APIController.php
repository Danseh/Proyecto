<?php

namespace App\Controller;

use App\Entity\Libro;
use App\Entity\Comentario;
use App\Entity\Valoracion;
use App\Repository\LibroRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/* #[Route('api')] */
class APIController extends AbstractController
{
    //#[Route('/libros', name: 'api_libros')]
    public function libros(LibroRepository $libroRepository):Response
    {
        $libros = $libroRepository
            ->findAll();

        return $this->json($libros, Response::HTTP_OK, [], ['groups' => 'infoLibros']);
    }

    //#[Route('/libros/{id}', name: 'api_libro_individual', methods: ['GET'])]
    public function libro(Libro $libro):Response
    {
        return $this->json($libro, Response::HTTP_OK, [], ['groups' => 'infoLibroIndividual']);
    }


    #[Route('api/login', name: 'api_login')]
    public function login(): Response
    {
        if ($this->getUser()) {
            return $this->json($this->getUser(), Response::HTTP_OK, [], ['groups' => 'infoUser']);
        } 
    }
    
}
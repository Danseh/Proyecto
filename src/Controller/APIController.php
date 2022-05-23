<?php

namespace App\Controller;

use App\Entity\Piso;
use App\Repository\PisoRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\HttpFoundation\HeaderUtils;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

/* #[Route('api')] */
class APIController extends AbstractController
{
    //#[Route('/libros', name: 'api_libros')]
    public function libros(PisoRepository $PisoRepository):Response
    {
        $piso = $pisoRepository
            ->findAll();

        return $this->json($pisos, Response::HTTP_OK, [], ['groups' => 'infoPisos']);
    }

    //#[Route('/libros/{id}', name: 'api_libro_individual', methods: ['GET'])]
    public function libro(Piso $piso):Response
    {
        return $this->json($piso, Response::HTTP_OK, [], ['groups' => 'infoPisoIndividual']);
    }

    #[Route('/publicarPiso', name: 'publicarPiso', methods: ['GET', 'POST'])]
    public function publicarPiso(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger): Response
    {
        $piso = new Piso();
        $titulo = $request->request->get('titulo');
        
        // var_dump($request->get('titulo'));
        $imagenes = $request->files->get('imagenes');

        if ($imagenes) {
            
            foreach ($imagenes as $imagen) {

                $originalFilename = pathinfo($imagen->getClientOriginalName(), PATHINFO_FILENAME);
                // $originalFilename->replaceMatches('/[^._,]++/', ' ');
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename.'-'.uniqid().'.'.$imagen->guessExtension();
                $rutaImagen = $this->getParameter('pisos_directory').$titulo;

                try {
                    $imagen->move(
                        $rutaImagen,
                        $newFilename
                    );

                    $piso->addImagen("/pisos/".$titulo."/".$newFilename);
                }
                catch (FileException $e) {
                // ... handle exception if something happens during file upload
                }
            }

        }
        $piso->setTitulo($titulo);
        $piso->setCiudad($request->request->get('ciudad'));
        $piso->setDireccion($request->request->get('direccion'));
        $piso->setDescripcion($request->request->get('descripcion'));
        $piso->setOwner($this->getUser());
        // $piso->addMiembro($this->getUser());

        $entityManager->persist($piso);
        $entityManager->flush();

        // $piso->setTitulo($request->request->get('titulo'));

        return $this->redirectToRoute('main', [], Response::HTTP_SEE_OTHER);
        

    }

    #[Route('api/login', name: 'api_login')]
    public function login(): Response
    {
        if ($this->getUser()) {
            return $this->json($this->getUser(), Response::HTTP_OK, [], ['groups' => 'infoUser']);
        } 
    }
    
}
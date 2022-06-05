<?php

namespace App\Controller;

use App\Entity\Piso;
use App\Entity\User;
use App\Repository\PisoRepository;
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

class PisoController extends AbstractController
{
    
    #[Route('/publicarPiso', name: 'publicarPiso', methods: ['GET', 'POST'])]
    public function publicarPiso(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger): Response
    {
        $piso = new Piso();
        $titulo = $request->request->get('titulo');
        
        $imagenes = $request->files->get('imagenes');

        $arrayImagenes;

        if ($imagenes && count($imagenes) <= 5) {
            
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

                    $arrayImagenes[] = "/pisos/".$titulo."/".$newFilename;
                }
                catch (FileException $e) {
                // ... handle exception if something happens during file upload
                }
            }

            $piso->setImagenes($arrayImagenes);
            $piso->setTitulo($titulo);
            $piso->setCiudad($request->request->get('ciudad'));
            $piso->setDireccion($request->request->get('direccion'));
            $piso->setDescripcion($request->request->get('descripcion'));
            $piso->setPlazas($request->request->get('plazas'));
            $piso->setEstado("Disponible");
            $piso->setPrecio($request->request->get('precio'));
            $piso->setOwner($this->getUser());
    
            $entityManager->persist($piso);
            $entityManager->flush();
        }

        
        return $this->redirectToRoute('main', [], Response::HTTP_SEE_OTHER);
        
    }

    #[Route('/piso/{piso}/addMyself', name: 'addMyself', methods: ['GET', 'POST'])]
    public function addMyself(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger, Piso $piso): Response
    {

    if ($this->getUser()) {
        $piso->addInteresado($this->getUser());

        $entityManager->persist($piso);
        $entityManager->flush();

    }
    
        return $this->json($piso, Response::HTTP_OK, [], ['groups' => 'infoPisoIndividual']);
    }

    #[Route('/piso/{piso}/removeMyself', name: 'removeMyself', methods: ['GET', 'POST'])]
    public function removeMyself(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger, Piso $piso): Response
    {

    if ($this->getUser()) {
        $piso->removeInteresado($this->getUser());

        $entityManager->persist($piso);
        $entityManager->flush();

    }
    
        return $this->json($piso, Response::HTTP_OK, [], ['groups' => 'infoPisoIndividual']);
    }
    

    #[Route('/piso/{piso}/removeInteresado/{user}', name: 'removeInteresado', methods: ['GET', 'POST'])]
    public function removeInteresado(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger, Piso $piso, User $user): Response
    {

    if ($user) {
        $piso->removeInteresado($user);

        $entityManager->persist($piso);
        $entityManager->flush();

    }
    
        return $this->json($piso, Response::HTTP_OK, [], ['groups' => 'infoPisoIndividual']);
    }

    #[Route('/piso/{piso}/addMiembro/{user}', name: 'addMiembro', methods: ['GET', 'POST'])]
    public function addMiembro(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger, Piso $piso, User $user): Response
    {

        

        if (count($piso->getMiembros()) >= $piso->getPlazas()) {
            $piso->setEstado("Ocupado");
        }
        else {
            $piso->addMiembro($user);
            // $user->clearPisosInteresado();
        }

        $entityManager->persist($piso);
        $entityManager->flush();

    
    
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'infoUserIndividual']);
    }

    #[Route('/piso/{piso}/removeMiembro/{user}', name: 'removeMiembro', methods: ['GET', 'POST'])]
    public function removeMiembro(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger, Piso $piso, User $user): Response
    {

    if ($user) {
        $piso->removeMiembro($user);

        $entityManager->persist($piso);
        $entityManager->flush();

    }
    
        return $this->json($user, Response::HTTP_OK, [], ['groups' => 'infoPisoIndividual']);
    }
}
<?php

namespace App\Controller;

use App\Entity\User;
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

class UserController extends AbstractController
{
    
    #[Route('/user/{user}/subirFoto', name: 'subirFoto', methods: ['GET', 'POST'])]
    public function subirFoto(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger, User $user): Response
    {
        $user = $this->getUser();
        $username = $user->getUsername();
        $imagen = $request->files->get('fotoPerfil');

        $originalFilename = pathinfo($imagen->getClientOriginalName(), PATHINFO_FILENAME);
        // $originalFilename->replaceMatches('/[^._,]++/', ' ');
        // this is needed to safely include the file name as part of the URL
        $safeFilename = $slugger->slug($originalFilename);
        $newFilename = $safeFilename.'-'.uniqid().'.'.$imagen->guessExtension();
        $rutaImagen = $this->getParameter('profiles_directory').$username;

        try {
            $imagen->move(
                $rutaImagen,
                $newFilename
            );

            $user->setFoto("/profiles/".$username."/".$newFilename);
        }
        catch (FileException $e) {
        // ... handle exception if something happens during file upload
        }

        $entityManager->persist($user);
        $entityManager->flush();
        

        return $this->redirect('/user/'.$user->getId());
    }
}
<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\SecurityController;
use App\Entity\User;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class MainController extends AbstractController
{
    #[Route('/{reactRouting?}', name: 'main', priority: "-1", requirements: ['reactRouting'=>'.+'])]
    //#[Route('/', name: 'main')]
    public function index(AuthenticationUtils $authenticationUtils): Response
    {
        return $this->render('main/index.html.twig', [
           'user' => $this->getUser(),
        ]);

    }

}

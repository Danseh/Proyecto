<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('username', TextType::class, [
                'attr' => ['class' => 'form-control',
                'placeholder' => 'Introduce tu nombre de usuario'],
                'label' => 'Usuario',
            ])
            ->add('nombre', TextType::class, [
                'attr' => ['class' => 'form-control',
                'placeholder' => 'Introduce tu nombre'],
            ])
            ->add('apellidos', TextType::class, [
                'attr' => ['class' => 'form-control',
                'placeholder' => 'Introduce tus apellidos'],
            ])
            ->add('plainPassword', PasswordType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password',
                'class' => 'form-control',
                'placeholder' => 'Introduce tu contraseña (mínimo 6 caracteres)'],
                'constraints' => [
                    new NotBlank([
                        'message' => 'Introduce una contraseña por favor',
                    ]),
                    new Length([
                        'min' => 6,
                        'minMessage' => 'La contraseña debe tener al menos {{ limit }} caracteres',
                        // max length allowed by Symfony for security reasons
                        'max' => 30,
                    ]),
                ],
            ])
            ->add('email', EmailType::class, [
                'attr' => ['class' => 'form-control',
                'placeholder' => 'Introduce tu email'],
            ])
            ->add('sexo', ChoiceType::class, [
                'choices' => [
                    'Hombre' => 'Hombre',
                    'Mujer' => 'Mujer',
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}

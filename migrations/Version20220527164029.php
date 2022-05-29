<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220527164029 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE piso ADD precio INT DEFAULT NULL, ADD plazas INT NOT NULL, ADD estado VARCHAR(20) NOT NULL, ADD fecha_disponible DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD piso_id INT DEFAULT NULL, ADD nombre VARCHAR(50) NOT NULL, ADD apellidos VARCHAR(100) DEFAULT NULL, ADD telefono INT DEFAULT NULL, ADD email VARCHAR(50) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6491AC830AF FOREIGN KEY (piso_id) REFERENCES piso (id)');
        $this->addSql('CREATE INDEX IDX_8D93D6491AC830AF ON user (piso_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE piso DROP precio, DROP plazas, DROP estado, DROP fecha_disponible');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6491AC830AF');
        $this->addSql('DROP INDEX IDX_8D93D6491AC830AF ON user');
        $this->addSql('ALTER TABLE user DROP piso_id, DROP nombre, DROP apellidos, DROP telefono, DROP email');
    }
}

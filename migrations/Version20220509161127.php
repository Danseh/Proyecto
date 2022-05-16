<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220509161127 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE piso (id INT AUTO_INCREMENT NOT NULL, owner_id INT DEFAULT NULL, titulo VARCHAR(255) NOT NULL, ubicacion VARCHAR(255) DEFAULT NULL, descripcion VARCHAR(255) DEFAULT NULL, fecha_publicacion DATE DEFAULT NULL, INDEX IDX_D462D9D37E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE piso_user (piso_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_EBB84A9D1AC830AF (piso_id), INDEX IDX_EBB84A9DA76ED395 (user_id), PRIMARY KEY(piso_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649F85E0677 (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE piso ADD CONSTRAINT FK_D462D9D37E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE piso_user ADD CONSTRAINT FK_EBB84A9D1AC830AF FOREIGN KEY (piso_id) REFERENCES piso (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE piso_user ADD CONSTRAINT FK_EBB84A9DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE piso_user DROP FOREIGN KEY FK_EBB84A9D1AC830AF');
        $this->addSql('ALTER TABLE piso DROP FOREIGN KEY FK_D462D9D37E3C61F9');
        $this->addSql('ALTER TABLE piso_user DROP FOREIGN KEY FK_EBB84A9DA76ED395');
        $this->addSql('DROP TABLE piso');
        $this->addSql('DROP TABLE piso_user');
        $this->addSql('DROP TABLE user');
    }
}

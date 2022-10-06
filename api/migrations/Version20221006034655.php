<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221006034655 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE donation ALTER payment TYPE TEXT');
        $this->addSql('ALTER TABLE donor ALTER name TYPE TEXT');
        $this->addSql('ALTER TABLE donor ALTER email TYPE TEXT');
        $this->addSql('ALTER TABLE donor ALTER status TYPE TEXT');
        $this->addSql('ALTER TABLE installments_donation ALTER payment TYPE TEXT');
        $this->addSql('ALTER TABLE installments_donation ALTER status TYPE TEXT');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE donor ALTER name TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE donor ALTER email TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE donor ALTER status TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE installments_donation ALTER payment TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE installments_donation ALTER status TYPE VARCHAR(255)');
        $this->addSql('ALTER TABLE donation ALTER payment TYPE VARCHAR(255)');
    }
}

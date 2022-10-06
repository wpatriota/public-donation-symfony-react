<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221006164842 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE installments_donation_id_seq CASCADE');
        $this->addSql('DROP TABLE installments_donation');
        $this->addSql('ALTER TABLE donor DROP donation_value');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('CREATE SEQUENCE installments_donation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE installments_donation (id INT NOT NULL, amount_paid DOUBLE PRECISION NOT NULL, payment TEXT NOT NULL, status TEXT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE donor ADD donation_value DOUBLE PRECISION NOT NULL');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221006044203 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE donation DROP CONSTRAINT fk_31e581a03dd7b7a7');
        $this->addSql('DROP INDEX idx_31e581a03dd7b7a7');
        $this->addSql('ALTER TABLE donation DROP donor_id');
        $this->addSql('ALTER TABLE installments_donation DROP CONSTRAINT fk_997b30494dc1279c');
        $this->addSql('DROP INDEX idx_997b30494dc1279c');
        $this->addSql('ALTER TABLE installments_donation DROP donation_id');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE donation ADD donor_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE donation ADD CONSTRAINT fk_31e581a03dd7b7a7 FOREIGN KEY (donor_id) REFERENCES donor (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_31e581a03dd7b7a7 ON donation (donor_id)');
        $this->addSql('ALTER TABLE installments_donation ADD donation_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE installments_donation ADD CONSTRAINT fk_997b30494dc1279c FOREIGN KEY (donation_id) REFERENCES donation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_997b30494dc1279c ON installments_donation (donation_id)');
    }
}

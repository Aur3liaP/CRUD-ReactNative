-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema harrybdd
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema harrybdd
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `harrybdd` DEFAULT CHARACTER SET utf8 ;
USE `harrybdd` ;

-- -----------------------------------------------------
-- Table `harrybdd`.`house`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrybdd`.`house` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `points` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `harrybdd`.`character`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `harrybdd`.`character` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lastname` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `house_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_character_house_idx` (`house_id` ASC) VISIBLE,
  CONSTRAINT `fk_character_house`
    FOREIGN KEY (`house_id`)
    REFERENCES `harrybdd`.`house` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

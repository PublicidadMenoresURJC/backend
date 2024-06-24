CREATE TABLE `mediateca`.`publicaciones` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `anunciante` VARCHAR(100) NOT NULL,
  `tipo` VARCHAR(100) NOT NULL,
  `tematica` VARCHAR(100) NOT NULL,
  `medios` VARCHAR(100) NOT NULL,
  `ano` YEAR NOT NULL DEFAULT 1901,
  `nombreMedio` VARCHAR(100) NOT NULL,
  `objetivo` VARCHAR(300) NOT NULL,
  `publicoObjetivo` VARCHAR(100) NOT NULL,
  `presupuesto` INT NULL,
  `sinopsis` VARCHAR(1000) NOT NULL,
  `createdAt` DATETIME NULL,
  `updatedAt` DATETIME NULL,
  `urlFile` VARCHAR(255) NOT NULL,
  `nameFile` VARCHAR(100) NOT NULL,
  `typeFile` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


CREATE TABLE `mediateca`.`palabrasclave` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL DEFAULT ' ',
  `idPubl` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `idPubl_idx` (`idPubl` ASC) VISIBLE,
  CONSTRAINT `idPalabrasClave`
    FOREIGN KEY (`idPubl`)
    REFERENCES `mediateca`.`publicaciones` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `mediateca`.`menor` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `protagonismo` ENUM("P", "S") NOT NULL DEFAULT 'S',
  `genero` ENUM("M", "F") NOT NULL DEFAULT 'M',
  `idPubl` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `idMenor_idx` (`idPubl` ASC) VISIBLE,
  CONSTRAINT `idMenor`
    FOREIGN KEY (`idPubl`)
    REFERENCES `mediateca`.`publicaciones` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `mediateca`.`rolmenor` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `idMenor` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `idRolMenor_idx` (`idMenor` ASC) VISIBLE,
  CONSTRAINT `idRolMenor`
    FOREIGN KEY (`idMenor`)
    REFERENCES `mediateca`.`menor` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


CREATE TABLE `mediateca`.`rolesmujer` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL DEFAULT ' ',
  `idPubl` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `idRolesMujer_idx` (`idPubl` ASC) VISIBLE,
  CONSTRAINT `idRolesMujer`
    FOREIGN KEY (`idPubl`)
    REFERENCES `mediateca`.`publicaciones` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `mediateca`.`roleshombre` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL DEFAULT ' ',
  `idPubl` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `idRolesHombre_idx` (`idPubl` ASC) VISIBLE,
  CONSTRAINT `idRolesHombre`
    FOREIGN KEY (`idPubl`)
    REFERENCES `mediateca`.`publicaciones` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `mediateca`.`relacionesgenero` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(300) NOT NULL DEFAULT ' ',
  `idPubl` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `idRelaciones_idx` (`idPubl` ASC) VISIBLE,
  CONSTRAINT `idRelaciones`
    FOREIGN KEY (`idPubl`)
    REFERENCES `mediateca`.`publicaciones` (`ID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


CREATE TABLE `mediateca`.`usuarios` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL DEFAULT ' ',
  `nombre` VARCHAR(100) NOT NULL DEFAULT ' ',
  `pass` VARCHAR(1000) NOT NULL DEFAULT ' ',
  `rol` ENUM("I", "A","P") DEFAULT 'I',
  `idPubl` INT NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;
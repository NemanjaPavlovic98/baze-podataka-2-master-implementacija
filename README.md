# Projekat iz predmeta 'Baze podataka 2'
Tema: 'Informacioni sistem prodaje preduzeća "SMUK rakija"'


## Opis podsistema za koje se radi projekat
Radnja za proizvodnju pića i konzervaciju voća ”PR Vesna Vukojević” osnovana je 2013. godine.  Radnja se bavi primarno proizvodnjom rakije i njen najveći brend se zove ”SMUK rakija”. Brend je osnovan početkom 2020. godine. Vremenom, probijajući se na tržište, brend zauzima jedno od vodećih mesta u Srbiji u oblasti voćnih destilata. Celokupan proces proizvodnje, od održavanja voćnjaka do procesa proizvodnje i marketinga, odrađuje preduzeće.

Proces prodaje započinje distributer slanjem **narudžbenice**. Nakon prijema narudžbenice, preduzeće šalje **ponudu** distributeru sa svim predlozima, cenama i uslovima plaćanja, kao i **predračun**. Kupac šalje odgovor i ukoliko je odgovor potvrdan, uplaćuje se iznos predračuna. Nakon toga, priprema se isporuka rakije i vrši se unos u **knjigu točenja** odnosno hasap zbog evidencije i upravljanja zalihama. Po završetku pripreme rakije, šalje se roba kupcu sa **otpremnicom** i **računom**.

## Projektovanje baze podataka - PMOV za svaki dokument
Ponuda:

![image](https://user-images.githubusercontent.com/48028697/149149803-866cfadb-fc0b-4e08-957d-ff4a1e16f527.png){ width: 300px; }

Predračun:

![image](https://user-images.githubusercontent.com/48028697/149150357-92bea7da-f13a-49de-b82d-9034d5383fce.png){ width: 300px; }

Knjiga točenja (hasap):

![image](https://user-images.githubusercontent.com/48028697/149150453-62705ff7-d592-4e85-b4a8-7c896ce3eec9.png){ width: 300px; }

Otpremnica:

![image](https://user-images.githubusercontent.com/48028697/149150470-d6b0078b-8963-4828-a8ea-d7aa371cf40b.png){ width: 300px; }

Račun:

![image](https://user-images.githubusercontent.com/48028697/149150486-c3eb79ff-2845-413b-93a1-1bbdd1b20641.png){ width: 300px; }

## Denormalizacija relacija
### Narušavanje druge normalne forme
![image](https://user-images.githubusercontent.com/48028697/149150715-8f56848c-f0d9-46fd-a06b-91e707cecbcb.png)

Primer trigera: 
- Triger koji prilikom unosa vrednosti u tabelu Ulica u kolonu NazivMesta upisuje odgovarajuću vrednost za unetu vrednost PostanskiBroj:
<pre>
CREATE OR REPLACE FUNCTION insert_ulica_fnc()
RETURNS trigger AS
$$
DECLARE pom_naziv_mesta VARCHAR(20);
BEGIN
	SELECT naziv_mesta INTO pom_naziv_mesta
	FROM mesto
	WHERE mesto.postanski_broj = NEW.postanski_broj;
	NEW.naziv_mesta = pom_naziv_mesta;
	RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';


CREATE TRIGGER insert_ulica
  AFTER INSERT ON ulica
  FOR EACH ROW
  EXECUTE PROCEDURE insert_ulica_fnc();
![image](https://user-images.githubusercontent.com/48028697/149150879-5dbff0d7-21cb-4a2a-9b81-7192434ca4c1.png)
</pre>

### Narušavanje treće normalne forme

![image](https://user-images.githubusercontent.com/48028697/149150753-e76c9a42-e833-4b23-a9dd-eac773113607.png)

Primer trigera: 
-  Triger koji prilikom izmene vrednosti SifraJM u tabeli Proizvod ažurira vrednost kolone NazivJM:
<pre>
CREATE OR REPLACE FUNCTION update_naziv_jm_fnc()
RETURNS trigger AS
$$
BEGIN
ALTER TABLE proizvod DISABLE TRIGGER zabrana_izmene_naziva_jm;
	UPDATE proizvod
	SET naziv_jm = (SELECT naziv_jm 
			FROM jedinica_mere
			WHERE sifra_jm = NEW.sifra_jm)
	WHERE sifra_jm = NEW.sifra_jm;
	ALTER TABLE proizvod ENABLE TRIGGER zabrana_izmene_naziva_jm;
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_naziv_jm
  AFTER UPDATE ON proizvod
  FOR EACH ROW
  EXECUTE PROCEDURE update_naziv_jm_fnc();
</pre>

## Korisnički definisani tipovi i indeksi
### Distinct tip
<pre>
CREATE DOMAIN radnik_info AS 
   VARCHAR NOT NULL CHECK (value !~ '\s');
</pre>
Kreirani tip korišćen je u tabeli Zaposleni. Kod atributa ime i prezime, naredba za kreiranje tabele je:
<pre>
CREATE TABLE zaposleni (
    id_zaposlenog serial PRIMARY KEY,
    first_name radnik_info,
    last_name radnik_info
);
</pre>

### Struktuirani tip
Struktuirani tip se koristi kod tabele proizvod
<pre>
CREATE TYPE proizvod_info AS (
    naziv text,
    opis integer,
    jacina numeric,
    brLabaratorijskeAnalize numeric
);
</pre>

### Indeks
U ovom primeru kreiran je indeks nad tabelom Mesto i to nad atributom koji se često ponavlja u WHERE klauzuli kada dolazi do pretraživanja tabele. Kreiran je indeks za atribut naziv_mesta.

U tabeli Ponuda je od vaznosti da se zna za kog klijenta se kreira ta ponuda i većina pretraga se vrši upravo za klijenta. Zbog toga se tu kreira indeks za vrednost spoljnog ključa kupac_id gde se nalazi šifra tog klijenta u bazi podataka.

## Particionisanje tabela
### Horizontalno particionisanje
Izvršena je podela tabele Ponuda u particije prema godinama za polje datum:
<pre>
CREATE TABLE ponuda(
	ponuda_id SERIAL NOT NULL,
	naziv varchar(30),
	datum DATE NOT NULL,
	kupac_id integer,
	PRIMARY key (ponuda_id),
	FOREIGN KEY (kupac_id)
        REFERENCES kupac (kupac_id)
)
PARTITION BY RANGE (datum);

CREATE TABLE ponuda_2021
PARTITION OF ponuda 
FOR VALUES FROM ('2021-01-01') TO ('2021-12-31');
</pre>

### Vertikalno particionisanje
Nad tabelom KnjigaTocenja bice izvšeno vertikalno particionisanje. KnjigaTocejna će biti podeljena na dve tabele i to **KnjigaTocenjaOsnovno** i **KnjigaTocenjaDetalji**:

KnjigaTocenja(Oznaka, Izdanje, Datum, NalogIzdao, NalogPrimio, PonudaID)
**Nakon vertikalnog particionisanje**:
KnjigaTocenjaOsnovno(Oznaka, Izdanje, Datum)
KnjigaTocenjaDetalji(Oznaka, NalogIzdao, NalogPrimio, PonudaID)

Kreiranje pogleda knjiga_tocenja_pregled koji objedinjuje ove 2 tabele:
<pre>
CREATE OR REPLACE VIEW knjiga_tocenja_pregled
AS 
SELECT ko.oznaka, ko.izdanje, ko.datum, kd.nalog_izdao, kd.nalog_primio, kd.ponuda_id
FROM knjigaTocenjaOsnovno ko, knjigaTocenjaDetalji kd
WHERE ko.oznaka = kd.oznaka;
</pre>

Primer trigera:
- Triger koji omogućava unos novog pogleda:
<pre>
CREATE OR REPLACE FUNCTION knjiga_tocenja_unos_fnc()
RETURNS trigger AS
$$
BEGIN
    INSERT INTO knjigaTocenjaOsnovno(oznaka, izdanje, datum) 
    VALUES (NEW.oznaka, NEW.izdanje, NEW.datum);
    INSERT INTO knjigaTocenjaDetalji(oznaka, nalog_izdao, nalog_primio, ponuda_id) 
    VALUES (NEW.oznaka, NEW.nalog_izdao, NEW.nalog_primio, NEW.ponuda_id);
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER knjiga_tocenja_unos
  INSTEAD OF INSERT ON knjiga_tocenja_pregled
  FOR EACH ROW
  EXECUTE PROCEDURE knjiga_tocenja_unos_fnc();
</pre>

## Primena drugih optimizacionih tehnika

### Storing Derivable Values
Ako se uvede polje UkupanIznos u tabelu Racun olaksava se upit nad bazom koji izračunava ukupnu vrednost računa. Polje UkupanIznos predstavlja izvedenu vrednost i računa se kao suma stavki računa, za polja iznos i količina.
![image](https://user-images.githubusercontent.com/48028697/149153198-a2ea58c4-4989-4583-81a7-85166c6ab660.png)

Primer trigera:
- Triger koji se okida prilikom unosa novog reda u tabeli StavkeRacuna:
<pre>
CREATE OR REPLACE FUNCTION update_racun_ukupno_fnc()
RETURNS trigger AS
$$
BEGIN
	ALTER TABLE racun DISABLE TRIGGER update_ukupan_iznos_zabrana;
	UPDATE racun
	SET ukupan_iznos = (SELECT SUM(iznos*kolicina) as suma
				  FROM stavka_racun
				  WHERE broj_racuna = NEW.broj_racuna)
	WHERE broj_racuna = NEW.broj_racuna;
	ALTER TABLE racun ENABLE TRIGGER update_ukupan_iznos_zabrana;
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_racun_ukupno
  AFTER INSERT ON stavka_racun
  FOR EACH ROW
  EXECUTE PROCEDURE update_racun_ukupno_fnc();
</pre>

### Repeating Single Detail with Master
![image](https://user-images.githubusercontent.com/48028697/149153449-f8535430-57c3-41d7-976c-2030d2299602.png)

Primer trigera:
- Triger koji se okida prilikom izmene reda u tabeli Cena:
<pre>
CREATE OR REPLACE FUNCTION update_cena_fnc()
RETURNS trigger AS
$$
BEGIN
	ALTER TABLE proizvodi DISABLE TRIGGER aktuelnacena_zabrana;
	UPDATE proizvodi
	SET aktuelna_cena = (SELECT iznos
				  FROM cena
				  WHERE proizvod_id = NEW.proizvod_id AND datum =          
                           (SELECT max(datum) 
			    FROM cena
			    WHERE proizvod_id = NEW.proizvod_id and datum <= NOW()))
	WHERE proizvod_id = NEW.proizvod_id;
	ALTER TABLE proizvodi ENABLE TRIGGER aktuelnacena_zabrana;
RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER update_cena
  AFTER UPDATE ON cena
  FOR EACH ROW
  EXECUTE PROCEDURE update_cena_fnc();
</pre>








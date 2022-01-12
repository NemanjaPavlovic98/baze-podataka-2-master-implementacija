# Projekat iz predmeta 'Baze podataka 2'
Tema: 'Informacioni sistem prodaje preduzeća "SMUK rakija"'


## Opis podsistema za koje se radi projekat
Radnja za proizvodnju pića i konzervaciju voća ”PR Vesna Vukojević” osnovana je 2013. godine.  Radnja se bavi primarno proizvodnjom rakije i njen najveći brend se zove ”SMUK rakija”. Brend je osnovan početkom 2020. godine. Vremenom, probijajući se na tržište, brend zauzima jedno od vodećih mesta u Srbiji u oblasti voćnih destilata. Celokupan proces proizvodnje, od održavanja voćnjaka do procesa proizvodnje i marketinga, odrađuje preduzeće.

Proces prodaje započinje distributer slanjem **narudžbenice**. Nakon prijema narudžbenice, preduzeće šalje **ponudu** distributeru sa svim predlozima, cenama i uslovima plaćanja, kao i **predračun**. Kupac šalje odgovor i ukoliko je odgovor potvrdan, uplaćuje se iznos predračuna. Nakon toga, priprema se isporuka rakije i vrši se unos u **knjigu točenja** odnosno hasap zbog evidencije i upravljanja zalihama. Po završetku pripreme rakije, šalje se roba kupcu sa **otpremnicom** i **računom**.

## Projektovanje baze podataka - PMOV za svaki dokument
- Ponuda
![image](https://user-images.githubusercontent.com/48028697/149149803-866cfadb-fc0b-4e08-957d-ff4a1e16f527.png)

- Predračun
![image](https://user-images.githubusercontent.com/48028697/149150357-92bea7da-f13a-49de-b82d-9034d5383fce.png)

- Knjiga točenja (hasap)
![image](https://user-images.githubusercontent.com/48028697/149150453-62705ff7-d592-4e85-b4a8-7c896ce3eec9.png)

- Otpremnica
![image](https://user-images.githubusercontent.com/48028697/149150470-d6b0078b-8963-4828-a8ea-d7aa371cf40b.png)

- Račun
![image](https://user-images.githubusercontent.com/48028697/149150486-c3eb79ff-2845-413b-93a1-1bbdd1b20641.png)

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




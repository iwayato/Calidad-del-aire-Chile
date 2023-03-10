import {
    Text,
    Link,
    Heading,
    Grid,
    GridItem,
    HStack,
    Button,
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    UnorderedList,
    ListItem,
    Spinner,
    Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import StatusSideBar from "./components/StatusSideBar";
import './App.css';

const url = "https://sinca.mma.gob.cl/index.php/json/listadomapa2k19/";

function App() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true);

    const getData = () => {
        axios
            .get(url)
            .then(response => {
                setData(response.data)
                setLoading(false);
            })
            .catch(
                setData([])
            )
    }

    useEffect(() => {
        getData()

        const interval = setInterval(() => {
            getData()
        }, 3600000)

        return() => clearInterval(interval)
    }, [])

    if (isLoading) {
        return(
            <Center width='100%' height='100vh'>
                <Spinner
                    height='150px'
                    width='150px'
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'/>
            </Center>
        )
    }

    return (
        <Grid
            templateAreas = {`"header header"
                            "nav main"
                            "nav footer"`}
            gridTemplateRows = {'70px 1fr 30px'}
            gridTemplateColumns = {'355px 1fr'}
            color='blackAlpha.700'
            fontWeight='bold'>

            <GridItem pl = '15px' bg = 'gray.100' area = {'header'}>
                <HStack mt = '13px'>
                    <Heading> {' '}
                        <Link color='teal.500' href='https://sinca.mma.gob.cl/'>
                            Calidad del aire Chile
                        </Link>
                    </Heading>
                    <Box
                        onClick={onOpen}
                        as = {Button} 
                        left = 'calc(100% - 675px)'>
                            ??Qu?? es lo que se est?? midiendo?
                    </Box>
                </HStack>
            </GridItem>
            
            <GridItem bg='gray.400' area={'nav'}>
                <StatusSideBar
                    data = {data}>
                </StatusSideBar>
            </GridItem>

            <GridItem area={'main'}>
                {/* Map Component With Props */}
                <Map stationsData = {data}/>
            </GridItem>

            <GridItem pl='2' bg='gray.600' area={'footer'} color='white'>
                <HStack>
                    <Text marginTop='3px'>
                        Realizado por {' '} {' '}
                        <Link color='teal.500' href='https://github.com/iwayato'>
                            Tomoaki Iwaya Villalobos
                        </Link>
                    </Text>
                    <Text>
                        -
                    </Text>
                    <Text>
                        2023     
                    </Text>                    
                </HStack>
            </GridItem>

            <Modal size='xl' scrollBehavior="inside" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Contaminantes</ModalHeader>

                    <ModalCloseButton></ModalCloseButton>

                    <ModalBody>
                        <Heading size='sm'>Material particulado</Heading>
                        <Text align='justify'>
                            Contaminante atmosf??rico que corresponde a aquellas part??culas l??quidas o s??lidas
                            que se encuentran en suspensi??n, siendo posible clasificarlo seg??n su di??metro en 
                            MP10 (grueso) y MP2,5 (fino). El primero es aquel en que las part??culas tienen un 
                            di??metro menor a 10 micrones (o micr??metros), y el segundo, en que las part??culas 
                            tienen un di??metro menor a 2,5 micrones. Por lo mismo, el MP2,5 se encuentra 
                            contenido en el MP10. Tambi??n existe el denominado MP ultrafino, de alrededor 
                            de 0,1 ??m de di??metro. La concentraci??n de MP es el valor promedio temporal 
                            detectado en el aire y se mide en microgramos por metro c??bico normal (??g/m3N).
                        </Text>
                        <br></br>
                        <Heading size='sm'>Ozono troposf??rico</Heading>
                        <Text align='justify'>
                            Gas incoloro que se crea a trav??s de reacciones fotoqu??micas entre ??xidos de nitr??geno 
                            (NOx) y compuestos org??nicos vol??tiles (COV) derivados de fuentes como la quema de 
                            combustible. Esto se convierte en un problema, puesto que el ozono, en concentraci??n 
                            suficiente, puede provocar da??os en la salud humana (a partir de unos 150 microgramos 
                            por metro c??bico) o en la vegetaci??n (a partir de 30 ppb (partes por bill??n anglosaj??n, 
                            o millardo) y contribuye a generar un calentamiento en la superficie de la Tierra.
                            Cabe destacar que el  mecanismo mediante el cual se genera el ozono en la trop??sfera 
                            es completamente distinto, ya que depende de contaminantes provenientes de la 
                            actividad humana, mientras que el ozono estratosf??rico se forma por la acci??n de la
                            radiaci??n ultravioleta.
                        </Text>
                        <br></br>
                        <Heading size='sm'>Di??xido de azufre</Heading>
                        <Text align='justify'>
                            Gas irritante y t??xico. Afecta sobre todo las mucosidades y los pulmones provocando 
                            ataques de tos. Si bien este es absorbido principalmente por el sistema nasal, 
                            la exposici??n de altas concentraciones por cortos per??odos de tiempo puede irritar 
                            el tracto respiratorio, causar bronquitis y congestionar los conductos bronquiales 
                            de los asm??ticos. La concentraci??n m??xima permitida en los lugares de trabajo 
                            es de 2 ppm. Es el principal causante de la lluvia ??cida.
                        </Text>
                        <br></br>
                        <Heading size='sm'>Di??xido de nitr??geno</Heading>
                        <Text align='justify'>
                            Es un gas t??xico, irritante y precursor de la formaci??n de part??culas de nitrato. 
                            Estas llevan a la producci??n de ??cido y elevados niveles de PM-2.5 en el ambiente. 
                            Afecta principalmente al sistema respiratorio.
                        </Text>
                        <br></br>
                        <Heading size='sm'>Mon??xido de carbono</Heading>
                        <Text align='justify'>
                            Gas incoloro y altamente t??xico. Puede causar la muerte cuando se respira en niveles 
                            muy elevados (0,4% de concentraci??n en el aire). Se produce por la combusti??n deficiente 
                            de sustancias como gas, gasolina, queroseno, carb??n, petr??leo, tabaco o madera. 
                            Las chimeneas, las calderas, los calentadores de agua o calefactores y los aparatos 
                            dom??sticos que queman combustible, como las estufas u hornillas de la cocina o los 
                            calentadores a queroseno, tambi??n pueden producirlo si no est??n funcionando bien.
                        </Text>
                        <br></br>
                        <Heading size='sm'>Fuentes</Heading>
                        <UnorderedList>
                            <ListItem>
                                <Link 
                                    href='https://airechile.mma.gob.cl/faq' 
                                    color='teal.500'>
                                        Aire Chile
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link 
                                    href='https://es.wikipedia.org/wiki/Ozono' 
                                    color='teal.500'>
                                        Ozono
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link
                                    href='https://es.wikipedia.org/wiki/Di%C3%B3xido_de_azufre' 
                                    color='teal.500'>
                                        Di??xido de azufre
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link
                                    href='https://es.wikipedia.org/wiki/Di%C3%B3xido_de_nitr%C3%B3geno' 
                                    color='teal.500'>
                                        Di??xido de nitr??geno
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link
                                    href='https://es.wikipedia.org/wiki/Mon%C3%B3xido_de_carbono' 
                                    color='teal.500'>
                                        Mon??xido de carbono
                                </Link>
                            </ListItem>
                        </UnorderedList>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={0} onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Grid>
    );
}

export default App;

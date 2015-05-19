/*jslint nomen : true*/
/*jslint bitwise : true*/
/*jslint browser : true*/
/*global $, BodyAtlas, _, Backbone */

BodyAtlas.DLQI = {
    /**
     * DLQI Coefficient for each predictor/graph
     */
    QOLData: {
        TotalActivity: {
            Id: 1,
            Name: "time or ability to do daily activities",
            Coefficients: {
                Intercept: [0.861300856699703, 3.15070996311407],
                Age: [0.00599364297045401, -0.00177279656648916],
                Female: [-0.0181174253002742, -0.19868914531965],
                Weight: [-0.0000856604756602143, 0.000109130379857873],
                Pruritis: [-0.174450179899629, 0.0544377959340541],
                Pain: [-0.024848183028367, 0.00780381810613947],
                PASIPsA: [0.00742955033241838, -0.00399523673834677],
                Employed: [0.660324091798735, -0.249639051863347],
                PASITot_female: [-0.0448302616874236, 0.00459900560054315],
                PASITot_male: [-0.037417011643049, 0.00802051875338325]
            }
        },

        WorkProductivity: {
            Id: 2,
            Name: "work productivity",
            Coefficients: {
                Intercept: [2.2205485664875, 2.69547806679351],
                Age: [0.00410899924432406, 0.00153122901101831],
                Female: [0.181436280578462, -0.132800885433614],
                Weight: [-0.00412283527974647, 0.000719610867640646],
                Pruritis: [-0.199062383403432, 0.0320749876607308],
                Pain: [-0.0217325853568643, 0.00832509550383394],
                PASIPsA: [-0.00331218195857045, -0.00859721869847057],
                Employed: [0.0, 0.0],
                PASITot_female: [-0.0139054626790733, 0.0138251537160708],
                PASITot_male: [-0.0195083789672597, 0.0111032840289162]
            }
        }
    },
    DLQIData: {

        /**
         * Document the expected object map/literal OR refactor to value object
         */
        ItchPain: {
            Id: 1,
            InitialOrder: 1,
            Name: "Itching/pain",
            Coefficients: {
                Intercept: [-1.75965534429647, -6.81280651127279, -13.4477728337906],
                Age: [0.00720903670115425, 0.0123287371404846, 0.0101811316277989],
                Female: [0.0162896812611025, 0.0823827177206677, 0.18507310878243],
                Weight: [0.0014941480446887, 0.000885456220017126, 0.00406793363403636],
                Pruritis: [1.19869206491761, 1.84999463968502, 2.49680679577408],
                Pain: [0.0113560833084359, 0.0277996255984913, 0.040040363587128],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00847302927898823, -0.0111548001426417, -0.00970903991444743],
                FemaleHeadScore: [0.02063447663508, 0.161620623261543, 0.279193074028378],
                MaleHeadScore: [0.245862987631896, 0.414284370644227, 0.421182735516536],
                FemaleUpperScore: [-0.0216480340861361, 0.01903360733318, 0.0795700045014507],
                MaleUpperScore: [-0.0562034607782749, -0.0054907026668701, 0.00435136311205022],
                FemaleTrunkScore: [-0.00870315589124179, 0.0152740795362696, 0.0116812030323015],
                MaleTrunkScore: [0.0673517119213786, 0.0845049368729064, 0.0824187057485748],
                FemaleLowerScore: [0.160783892110326, 0.220337878875232, 0.245620946083656],
                MaleLowerScore: [0.0487420515448189, 0.0885927591664459, 0.125725128713955]
            }
        },
        Embarrassment: {
            Id: 2,
            InitialOrder: 2,
            Name: "Embarrassment/self-consciousness",
            Coefficients: {
                Intercept: [-0.740615099372395, -2.5912761208714, -4.11940049885264],
                Age: [-0.00709169010479627, -0.0126680136925292, -0.0218900365524619],
                Female: [0.0985910714072012, 0.132764071628534, 0.330326981013626],
                Weight: [-0.000391709363169625, -0.00365821779324655, -0.000796540510438505],
                Pruritis: [0.198401040108691, 0.386712513213369, 0.551124508400783],
                Pain: [0.0107832896667569, 0.0192005935961784, 0.0251785227842387],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00864275937292506, -0.00886752653509315, -0.0146738353863188],
                FemaleHeadScore: [0.149004983320968, 0.234610503854247, 0.335231301864379],
                MaleHeadScore: [0.13088561527701, 0.22738037407084, 0.183248714119997],
                FemaleUpperScore: [0.0933686150308858, 0.16667886649317, 0.240412800303226],
                MaleUpperScore: [0.0600229163709642, 0.116693412712805, 0.153987300445458],
                FemaleTrunkScore: [-0.002131905435931, 0.0388330163241527, 0.0267645839566563],
                MaleTrunkScore: [0.049365831464658, 0.0773538687895137, 0.0901301685222204],
                FemaleLowerScore: [0.0984268010918419, 0.142720712349417, 0.142560823477065],
                MaleLowerScore: [0.0779812091935757, 0.0978169588062446, 0.109694141854795]
            }
        },
        HouseholdActivities: {
            Id: 3,
            InitialOrder: 3,
            Name: "Interference with household activities",
            Coefficients: {
                Intercept: [-2.24915961724836, -4.46644138515858, -6.82628723630588],
                Age: [0.00206075211800049, 0.00826463221558607, 0.00306184365246756],
                Female: [0.126094770768707, 0.115633522060168, 0.355529321694635],
                Weight: [-0.00282940214071675, -0.00454216774366673, -0.00176610162327131],
                Pruritis: [0.128370557573476, 0.217126620134241, 0.345642228112952],
                Pain: [0.0189799426766263, 0.0302424158824007, 0.0383719218090949],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00729914536015215, -0.0186766233356788, -0.015752062131681],
                FemaleHeadScore: [-0.0484271871786414, -0.059816409532899, -0.0897816760107872],
                MaleHeadScore: [-0.00598412933282516, -0.0529851063256854, -0.0433629375085164],
                FemaleUpperScore: [0.0592682366221296, 0.192409965057619, 0.194366867931833],
                MaleUpperScore: [0.0357346095254567, 0.0922756759213183, 0.195312824782613],
                FemaleTrunkScore: [0.072739687250955, 0.0470675536051904, 0.0961426921374129],
                MaleTrunkScore: [0.0317855094674935, 0.0469931441957032, 0.0387214056299855],
                FemaleLowerScore: [0.0311594481569234, 0.0386939377826456, 0.0492849251335803],
                MaleLowerScore: [0.0422757339845475, 0.0536887188697735, 0.0520458055916864]
            }
        },
        Clothing: {
            Id: 4,
            InitialOrder: 4,
            Name: "Limitation of clothing choice",
            Coefficients: {
                Intercept: [-1.01298915127832, -2.42640540294806, -3.45382427440656],
                Age: [-0.00424317458861318, -0.0101320297230079, -0.0247058535725898],
                Female: [0.291943773452014, 0.343511517344385, 0.549785188281553],
                Weight: [0.000731499609361923, 0.000771411839245872, 0.00365162397563229],
                Pruritis: [0.154102537676721, 0.264706990219099, 0.417186226986735],
                Pain: [0.00657668534370078, 0.0151752016111663, 0.0192319547022173],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00478487604957871, -0.00390900476344856, -0.00909214553394761],
                FemaleHeadScore: [-0.0516987918621688, -0.00951460040716236, 0.112094506832709],
                MaleHeadScore: [0.030001280968446, 0.0523386631380154, 0.0645285987963501],
                FemaleUpperScore: [0.0262221234026049, 0.0834472483312698, 0.0848546456979979],
                MaleUpperScore: [0.0515136100220194, 0.107127092866115, 0.176210000583062],
                FemaleTrunkScore: [0.0222313644671827, 0.0390752857430848, 0.0359761281301869],
                MaleTrunkScore: [0.0532343824325944, 0.0935074185269201, 0.063434348517056],
                FemaleLowerScore: [0.0992112032303983, 0.174744324668236, 0.204050630225421],
                MaleLowerScore: [0.0550076858191718, 0.0645493467324179, 0.0836731582343357]
            }
        },
        SocialActivities: {
            Id: 5,
            InitialOrder: 5,
            Name: "Interference with social activities",
            Coefficients: {
                Intercept: [-1.35067272074143, -3.06616287768819, -4.50975828968652],
                Age: [-0.00433817614968046, -0.00231967850057018, -0.0145819949536859],
                Female: [0.037061689027667, 0.0386034578622289, 0.176061139533458],
                Weight: [-0.00166312087750096, -0.00439206100637103, -0.00185415876689838],
                Pruritis: [0.118715659308295, 0.223270710977643, 0.36808543954254],
                Pain: [0.0129388007200711, 0.022624381668256, 0.0273314235809708],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00607731576769193, -0.0133997636648774, -0.0153374915098585],
                FemaleHeadScore: [-0.0326974810965017, 0.0258751516254023, 0.0509428390563801],
                MaleHeadScore: [0.0122250955599021, -0.0244027338295034, -0.0566416166416144],
                FemaleUpperScore: [-0.0270903752979939, -0.0130395905826326, 0.0377456375697302],
                MaleUpperScore: [0.0260287199547005, 0.073113738526847, 0.116179060123505],
                FemaleTrunkScore: [0.0530179489407666, 0.0676141242316064, 0.0585859820890467],
                MaleTrunkScore: [0.0483953424535797, 0.0715896731655726, 0.0755595948347952],
                FemaleLowerScore: [0.0824095907717313, 0.0989340378937122, 0.109743631404506],
                MaleLowerScore: [0.0519337016258136, 0.0599928771617524, 0.0622950551074029]
            }
        },
        Sports: {
            Id: 6,
            InitialOrder: 6,
            Name: "Difficulties with sports",
            Coefficients: {
                Intercept: [-1.71904213174614, -3.51681068234866, -4.71033816639438],
                Age: [-0.00745406681270853, -0.00348289062862984, -0.0083580905390506],
                Female: [-0.0341577591146957, 0.0216505990384307, 0.111068016479178],
                Weight: [-0.00200600110617391, -0.00264387457795793, -0.00402585131581971],
                Pruritis: [0.0861139258298975, 0.152271567353049, 0.244476143674256],
                Pain: [0.0110441291074379, 0.0222987347186392, 0.0292659042593062],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.003394752422986, -0.00601579035118752, -0.00907061978803542],
                FemaleHeadScore: [-0.118168618482874, -0.174614452447128, -0.0981722568674388],
                MaleHeadScore: [-0.0349505151902457, -0.0985428560297882, -0.122843971988972],
                FemaleUpperScore: [-0.0417596081458229, -0.0065111810093628, 0.013503329862457],
                MaleUpperScore: [-0.0000578781935666859, 0.0119575765604104, 0.0793329003789815],
                FemaleTrunkScore: [0.0495421523434098, 0.0328911901907444, 0.0573729256524833],
                MaleTrunkScore: [0.0426265758446153, 0.0486673162621471, 0.0822646926670089],
                FemaleLowerScore: [0.0500722485751717, 0.0897228559699439, 0.0930938111650074],
                MaleLowerScore: [0.0327495194176459, 0.0751742502400048, 0.0615973697159935]
            }
        },
        WorkStudy: {
            Id: 7,
            InitialOrder: 7,
            Name: "Problems with work/study",
            Coefficients: {
                Intercept: [-1.94080516467188, -4.94931039774149, -4.16569579026367],
                Age: [-0.0104331945294087, -0.0149166553462816, -0.0094358795440563],
                Female: [-0.0187235787725041, 0.0172807374048351, 0.127010007673336],
                Weight: [-0.000122775048960718, -0.0039444988378543, -0.00443395432103837],
                Pruritis: [0.175224558430489, 0.339135745104803, 0.159767065505601],
                Pain: [0.0128510160451106, 0.0289823420877572, 0.036705132634146],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00685438669038245, -0.00538764759304439, -0.0197610653512524],
                FemaleHeadScore: [0.0050634575264131, -0.0714233564076991, -0.0746949297190489],
                MaleHeadScore: [0.0303017889793139, -0.0323402625031213, 0.041718160812738],
                FemaleUpperScore: [0.035114173249621, -0.0233673775585375, 0.0774521766990286],
                MaleUpperScore: [0.0502161727700504, 0.126729589974639, 0.165853781986795],
                FemaleTrunkScore: [0.0203089314924707, 0.0305012519464078, 0.0646697141580364],
                MaleTrunkScore: [0.020964615066998, 0.00101813068785998, 0.0570847184715306],
                FemaleLowerScore: [0.0125215047355035, 0.085605172259868, 0.0593313807619529],
                MaleLowerScore: [0.021158893334211, 0.040837771174866, 0.0277979805031549]
            }
        },
        FriendsFamily: {
            Id: 8,
            InitialOrder: 8,
            Name: "Problems with close friends/family",
            Coefficients: {
                Intercept: [-1.89405210257711, -3.8684007003192, -5.4534762093765],
                Age: [0.000108684519885066, 0.00527284435983098, -0.00592609066328912],
                Female: [-0.0557447455275585, 0.124534490507862, 0.159860126829481],
                Weight: [-0.00151653087159729, -0.00590550181548133, -0.00310572301832869],
                Pruritis: [0.133486245231517, 0.25213108313504, 0.349043428363496],
                Pain: [0.0118982269611096, 0.0225837837317261, 0.0284543931874292],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00873035785254388, -0.0169485849886118, -0.0164354252221479],
                FemaleHeadScore: [0.021168157996456, 0.0166706233321154, 0.0860463400118133],
                MaleHeadScore: [0.0454719119892346, 0.00316253754545865, -0.0430480922778864],
                FemaleUpperScore: [-0.0296595093681601, -0.0631193560648989, -0.0087278490479518],
                MaleUpperScore: [0.0108743310375829, 0.0219185434563319, 0.0828469291763851],
                FemaleTrunkScore: [0.0343884980653717, 0.0232623797571746, 0.0694713916701938],
                MaleTrunkScore: [0.0361407514538411, 0.0507065865163858, 0.0767216287941056],
                FemaleLowerScore: [0.0426264048595569, 0.0623663998257577, 0.0375756467001095],
                MaleLowerScore: [0.0338198164243672, 0.0499087940718875, 0.0284979749881272]
            }
        },
        SexualDifficulties: {
            Id: 9,
            InitialOrder: 9,
            Name: "Sexual difficulties",
            Coefficients: {
                Intercept: [-1.51359200527565, -3.18529855585084, -4.28620350871164],
                Age: [-0.00413409004959576, 0.000868753224520876, -0.00683640422544334],
                Female: [-0.0706820456605382, 0.0201716776974756, 0.0111354523432355],
                Weight: [-0.00632795001906202, -0.00745225775908832, -0.00863249673758732],
                Pruritis: [0.0990868186958176, 0.166076502343859, 0.260959058445984],
                Pain: [0.0109584635980572, 0.0198939243537766, 0.025403725723366],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [-0.00776581292628983, -0.0155724395374532, -0.00722351663129355],
                FemaleHeadScore: [0.0285510482600463, 0.0366028287344239, 0.0778524066778162],
                MaleHeadScore: [0.0349556186466429, -0.0791488965585881, -0.0701960389678721],
                FemaleUpperScore: [0.00281699668839297, -0.0672910311971943, -0.0126293158284392],
                MaleUpperScore: [-0.0314576880733337, 0.0169266150560181, 0.0147219557121671],
                FemaleTrunkScore: [0.000067445844119545, 0.0223741077269933, 0.058985456593308],
                MaleTrunkScore: [0.0261371275028798, 0.0342689878608988, 0.0614389340843441],
                FemaleLowerScore: [0.0139675307620686, 0.0362145443867042, 0.0329721222961553],
                MaleLowerScore: [0.0299967002210545, 0.0522217022267142, 0.0391356608533813]
            }
        },
        Treatment: {
            Id: 10,
            InitialOrder: 10,
            Name: "Inconvenience due to treatment",
            Coefficients: {
                Intercept: [-2.03132689633119, -5.02412854931276, -7.64798744012605],
                Age: [0.00828914997664791, 0.0180614361489807, 0.0131118093752596],
                Female: [-0.000471714861640286, 0.057197883357609, 0.205735979701203],
                Weight: [-0.000564185563686855, -0.000506132610579419, 0.00354109724054264],
                Pruritis: [0.100786515574219, 0.223935377491369, 0.383044739420883],
                Pain: [0.00678681489063354, 0.0168010187870168, 0.0256057325826949],
                PsoriaticArthritis: [0, 0, 0],
                PASIPsA: [0.00134662954531411, 0.00148580894324867, 0.00237909829385514],
                FemaleHeadScore: [-0.099438679279489, -0.0468780931971688, -0.0853400034295922],
                MaleHeadScore: [-0.00613416590111039, 0.0275352964679495, -0.078565495811342],
                FemaleUpperScore: [-0.0196270947519624, -0.0521333001305343, 0.0473993971716837],
                MaleUpperScore: [0.0256175456381001, 0.107769168068213, 0.19686424793466],
                FemaleTrunkScore: [0.0675814692967023, 0.107175755239895, 0.157668461166317],
                MaleTrunkScore: [0.0479742860192207, 0.092208270222244, 0.130754905811579],
                FemaleLowerScore: [0.0419295754324947, 0.09817409143216, 0.0752386923740481],
                MaleLowerScore: [0.0554657146958027, 0.0620077242491755, 0.0545478871783573]
            }
        }
    },


    /**
     * An DLQI/Quality of Life predictor
     *
     * @param name name of indicator
     * @param coefficients coefficient for calculations
     * @param inputs input for calculations
     * @returns {{scoreType: Function, name: Function, coefficients: Function, pasiValues: Function, bodyRegions: Function, setRegionCapacities: Function, setMaleRegionCapacities: Function, setFemaleRegionCapacities: Function, pasiGroupLimit: Function, inputs: Function, calculateCoverage: Function, calculateTotalCoverage: Function, calculateSeverity: Function, surfaceAreaMultiplier: Function, calculatePercentages: Function, calculateBodyPartPASI: Function, calculateAdjustedPASI: Function, calcSingleRawScore: Function, calcQOLSingleRawScore: Function, calculateAgeSubScore: Function, calculateFemaleSubScore: Function, calculateMaleSubScore: Function, calculateWeightSubScore: Function, calculatePruritisSubScore: Function, calculatePainSubScore: Function, calculatePASIDurationSubScore: Function, calculateHeadScoreSubScore: Function, calculateUpperScoreSubScore: Function, calculateTrunkScoreSubScore: Function, calculateLowerLimbScoreSubScore: Function, calculateEmploymentSubScore: Function, calculateTotalPasiScoreSubScore: Function, calcRawScores: Function, calcQOLRawScores: Function, loadSexSpecificCoefficients: Function, loadSexSpecificCoefficients: Function, convertNormalIndicatorToPercentagesResults: Function, convertQOLNormalIndicatorToPercentageResults: Function}}
     * @constructor
     */
    DLQIIndividualPredictor: function (name, coefficients, inputs) {
        "use strict";
        var _name = name,
            _coefficients = coefficients,
            _inputs = inputs,
            /**
             * An enumeration for ScoreType
             */
            _scoreType = {
                NOT_AT_ALL: 1,
                A_LITTLE: 2,
                A_LOT: 3,
                VERY_MUCH: 4
            },
            /**
             * An enumeration for PASI limit sub scores
             */
            _pasiGroupLimit = {
                PASI_LIMIT_0: 0,
                PASI_LIMIT_1: 10,
                PASI_LIMIT_2: 30,
                PASI_LIMIT_3: 50,
                PASI_LIMIT_4: 70,
                PASI_LIMIT_5: 90
            },
            /**
             * An enumeration for PASI bands
             */
            _pasiValues = {
                PASI_VALUE_0: 0,
                PASI_VALUE_1: 1,
                PASI_VALUE_2: 2,
                PASI_VALUE_3: 3,
                PASI_VALUE_4: 4,
                PASI_VALUE_5: 5,
                PASI_VALUE_6: 6
            },
            _palmsPerRegion = [10, 20, 30, 40],
            //arrays containing the hexagon capacities for each region.
            _maleHexCapacityPerRegion = [69.0, 232.0, 283.0, 337.0],
            _femaleHexCapacityPerRegion = [61.0, 152.0, 236.0, 336.0],
            _bodyRegions = {
                HEAD: 0,
                UPPER_EXTREMETIES: 1,
                TORSO: 2,
                LOWER_EXTREMETIES: 3
            },
            _surfaceAreaMultiplier = {
                HeadArea: 0.1,
                UpperArea: 0.2,
                TrunkArea: 0.3,
                LowerArea: 0.4
            };

        return {
            /**
             * The type or range of data to be calculated. i.e. whether a
             * coefficient is for A_LOT or NOT_A_LOT percentage values
             */
            scoreType: function () {
                return _scoreType;
            },

            /**
             * The name of this calculation
             */
            name: function () {
                return _name;
            },

            /**
             * The coefficients unique to this type of calculation
             */
            coefficients: function () {
                return _coefficients;
            },

            /**
             * An enumeration for PASI ranges
             */
            pasiValues: function () {
                return _pasiValues;
            },

            /**
             * A map of values that represent each of the 4 regions of the
             * body (head, torso, etc.). value of each index corresponds
             * with the values in the regionPalms array/
             * @returns {{HEAD: number, UPPER_EXTREMETIES: number, TORSO: number, LOWER_EXTREMETIES: number}}
             */
            bodyRegions: function () {
                return _bodyRegions;
            },

            setRegionCapacities: function (maleCapacities, femaleCapacities) {
                this.setMaleRegionCapacities(maleCapacities);
                this.setFemaleRegionCapacities(femaleCapacities);
            },

            setMaleRegionCapacities: function (maleCapacities) {
                _maleHexCapacityPerRegion[this.bodyRegions().HEAD] = maleCapacities.HEAD;
                _maleHexCapacityPerRegion[this.bodyRegions().UPPER_EXTREMETIES] = maleCapacities.UPPER_EXTREMETIES;
                _maleHexCapacityPerRegion[this.bodyRegions().TORSO] = maleCapacities.TORSO;
                _maleHexCapacityPerRegion[this.bodyRegions().LOWER_EXTREMETIES] = maleCapacities.LOWER_EXTREMETIES;
            },
            setFemaleRegionCapacities: function (femaleCapacities) {
                _femaleHexCapacityPerRegion[this.bodyRegions().HEAD] = femaleCapacities.HEAD;
                _femaleHexCapacityPerRegion[this.bodyRegions().UPPER_EXTREMETIES] = femaleCapacities.UPPER_EXTREMETIES;
                _femaleHexCapacityPerRegion[this.bodyRegions().TORSO] = femaleCapacities.TORSO;
                _femaleHexCapacityPerRegion[this.bodyRegions().LOWER_EXTREMETIES] = femaleCapacities.LOWER_EXTREMETIES;
            },

            /**
             * An enumeration for PASI limits
             */
            pasiGroupLimit: function () {
                return _pasiGroupLimit;
            },

            /**
             * The body and psoriasis data
             */
            inputs: function () {
                return _inputs;
            },


            calculateCoverage: function (bodyRegion, hexes) {
                var regionCapacity;
                if (_inputs.Male === 1) {
                    regionCapacity = _maleHexCapacityPerRegion[bodyRegion];
                } else {
                    regionCapacity = _femaleHexCapacityPerRegion[bodyRegion];
                }

                //returns the percentage coverage
                return (hexes < regionCapacity) ? (hexes / regionCapacity) * 100 : 100;
            },

            calculateTotalCoverage: function (inputs) {
                var percentFromHead = inputs.HeadArea / 100.0 * _palmsPerRegion[this.bodyRegions().HEAD],
                    percentFromArms = inputs.UpperLimbArea / 100.0 * _palmsPerRegion[this.bodyRegions().UPPER_EXTREMETIES],
                    percentFromTrunk = inputs.TrunkArea / 100.0 * _palmsPerRegion[this.bodyRegions().TORSO],
                    percentFromLegs = inputs.LowerLimbArea / 100.0 * _palmsPerRegion[this.bodyRegions().LOWER_EXTREMETIES];
                return percentFromHead + percentFromArms + percentFromTrunk + percentFromLegs;
            },
            /**
             * Given an array of severities from a region (not including
             * regions unpainted), calculates the average severity for the
             * region
             *
             * @param severities
             * @return {number}
             */
            calculateSeverity: function (severities) {
                var arrayUtil = new BodyAtlas.Utility.Array(),
                    average = 0;
                if (severities.length) {
                    average = arrayUtil.arraySum(severities) / severities.length;
                }
                return average * 2;
            },

            /**
             * The body and psoriasis data
             */
            surfaceAreaMultiplier: function () {
                return _surfaceAreaMultiplier;
            },
            /**
             * Returns a percentage representation of the DLQI for the input
             * already provided
             */
            calculatePercentages: function () {

                return this.convertNormalIndicatorToPercentagesResults(this
                    .calcRawScores(coefficients, inputs));
            },

            /**
             * Returns a PASI score based on body part information
             *
             * @param prediction
             *            The psoriasis data specfic to a given body part
             */
            calculateBodyPartPASI: function (prediction) {
                var pasi;
                if (prediction === this.pasiGroupLimit().PASI_LIMIT_0) {
                    pasi = this.pasiValues().PASI_VALUE_0;
                } else if (prediction < this.pasiGroupLimit().PASI_LIMIT_1) {
                    pasi = this.pasiValues().PASI_VALUE_1;
                } else if (prediction < this.pasiGroupLimit().PASI_LIMIT_2) {
                    pasi = this.pasiValues().PASI_VALUE_2;
                } else if (prediction < this.pasiGroupLimit().PASI_LIMIT_3) {
                    pasi = this.pasiValues().PASI_VALUE_3;
                } else if (prediction < this.pasiGroupLimit().PASI_LIMIT_4) {
                    pasi = this.pasiValues().PASI_VALUE_4;
                } else if (prediction < this.pasiGroupLimit().PASI_LIMIT_5) {
                    pasi = this.pasiValues().PASI_VALUE_5;
                } else {
                    pasi = this.pasiValues().PASI_VALUE_6;
                }
                return pasi;
            },

            /**
             * Returns the PASI score for a given input.
             *
             * @param inputs - the body graph inputs used for calculations
             * @returns {number}
             */
            calculateAdjustedPASI: function (inputs) {
                var _headAreaPASI = this.calculateBodyPartPASI(inputs.HeadArea),
                    _upperlimbAreaPASI = this.calculateBodyPartPASI(inputs.UpperLimbArea),
                    _trunkAreaPASI = this.calculateBodyPartPASI(inputs.TrunkArea),
                    _lowerAreaPASI = this.calculateBodyPartPASI(inputs.LowerLimbArea),
                    _headScorePASI = 0.1 * _headAreaPASI * inputs.HeadScore,
                    _upperLimbScorePASI = 0.2 * _upperlimbAreaPASI * inputs.UpperLimbScore,
                    _trunkScorePASI = 0.3 * _trunkAreaPASI * inputs.TrunkScore,
                    _lowerScorePASI = 0.4 * _lowerAreaPASI * inputs.LowerLimbScore;
                return _headScorePASI + _upperLimbScorePASI + _trunkScorePASI + _lowerScorePASI;

            },

            /**
             * Calculate a single raw score - a number that represented a
             * relative indicator for a given comfort level or Score Type.
             * Most indicators have 3 comfort levels.
             *
             * @param rawValue
             *            the score type/comfortlevel for this calculation
             * @param coefficients
             *            coefficient for calculations
             * @param inputs
             *            input for calculations
             * @return {number}
             */
            calcSingleRawScore: function (coefficients, rawValue, inputs) {
                var _age = this.calculateAgeSubScore(coefficients, rawValue, inputs),
                    _female = this.calculateFemaleSubScore(coefficients, rawValue, inputs),
                    _weight = this.calculateWeightSubScore(coefficients, rawValue, inputs),
                    _pruritis = this.calculatePruritisSubScore(coefficients, rawValue, inputs),
                    _pain = this.calculatePainSubScore(coefficients, rawValue, inputs),
                    _pasiPsA = this.calculatePASIDurationSubScore(coefficients, rawValue, inputs),
                    _headScore = this.calculateHeadScoreSubScore(coefficients, rawValue, inputs),
                    _upperScore = this.calculateUpperScoreSubScore(coefficients, rawValue, inputs),
                    _trunkScore = this.calculateTrunkScoreSubScore(coefficients, rawValue, inputs),
                    _lowerScore = this.calculateLowerLimbScoreSubScore(coefficients, rawValue, inputs);

                return _age + _female + _weight + _pruritis + _pain + _pasiPsA
                    + _headScore + _upperScore + _trunkScore + _lowerScore + coefficients.Intercept[rawValue];

            },

            calcQOLSingleRawScore: function (coefficients, rawValue, inputs) {

                var _age = this.calculateAgeSubScore(coefficients, rawValue, inputs),
                    _male = this.calculateMaleSubScore(coefficients, rawValue, inputs),
                    _weight = this.calculateWeightSubScore(coefficients, rawValue, inputs),
                    _pruritis = this.calculatePruritisSubScore(coefficients, rawValue, inputs),
                    _pain = this.calculatePainSubScore(coefficients, rawValue, inputs),
                    _pasiPsA = this.calculatePASIDurationSubScore(coefficients, rawValue, inputs),
                    _pasiTotalScore = this.calculateTotalPasiScoreSubScore(coefficients, rawValue, inputs),
                    _employmentScore = this.calculateEmploymentSubScore(coefficients, rawValue, inputs);

                return _age + _male + _weight + _pruritis + _pain + _pasiPsA + _employmentScore
                    + _pasiTotalScore + coefficients.Intercept[rawValue];

            },

            calculateAgeSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.Age[rawValue] * inputs.Age;
            },
            calculateFemaleSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.Female[rawValue] * inputs.Female;
            },


            calculateMaleSubScore: function (coefficients, rawValue, inputs) {
                return (inputs.Female) ? 0 : coefficients.Female[rawValue];
            },
            calculateWeightSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.Weight[rawValue] * inputs.Weight;
            },

            calculatePruritisSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.Pruritis[rawValue] * inputs.Pruritis;
            },

            calculatePainSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.Pain[rawValue] * inputs.Pain;
            },

            calculatePASIDurationSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.PASIPsA[rawValue] * inputs.PsoriasisDuration;
            },

            calculateHeadScoreSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.HeadScore[rawValue] * this.calculateBodyPartPASI(inputs.HeadArea) * this.surfaceAreaMultiplier().HeadArea * inputs.HeadScore;
            },

            calculateUpperScoreSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.UpperScore[rawValue] * this.calculateBodyPartPASI(inputs.UpperLimbArea) * this.surfaceAreaMultiplier().UpperArea * inputs.UpperLimbScore;
            },

            calculateTrunkScoreSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.TrunkScore[rawValue] * this.calculateBodyPartPASI(inputs.TrunkArea) * this.surfaceAreaMultiplier().TrunkArea * inputs.TrunkScore;
            },

            calculateLowerLimbScoreSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.LowerScore[rawValue] * this.calculateBodyPartPASI(inputs.LowerLimbArea) * this.surfaceAreaMultiplier().LowerArea * inputs.LowerLimbScore;
            },

            calculateEmploymentSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.Employed[rawValue] * inputs.Employed;
            },

            calculateTotalPasiScoreSubScore: function (coefficients, rawValue, inputs) {
                return coefficients.PasiTotalScore[rawValue] * this.calculateAdjustedPASI(inputs);
            },

            /**
             * Returns an array of RAW values (See excel). These values
             * later used to create the percentage representations
             *
             * @param coefficients
             * @returns {Array}
             */
            calcRawScores: function (coefficients, inputs) {
                var numCoefficients = coefficients.Age.length,
                    RawScores = [1],
                    rawScore;

                coefficients = this.loadSexSpecificCoefficients(coefficients, inputs);
                for (rawScore = 0; rawScore < numCoefficients; rawScore += 1) {
                    RawScores.push(this.calcSingleRawScore(coefficients,
                        rawScore, inputs));
                }

                return RawScores;
            },

            /**
             * Returns an array of Quality of life RAW values (See excel). These values
             * later used to create the percentage representation
             *
             * @param coefficients
             * @returns {Array}
             */
            calcQOLRawScores: function (coefficients, inputs) {
                var numCoefficients = coefficients.Age.length,
                    RawScores = [],
                    rawScore;

                coefficients = this.loadSexSpecificCoefficients(coefficients, inputs);
                for (rawScore = 0; rawScore < numCoefficients; rawScore += 1) {
                    RawScores.push(this.calcQOLSingleRawScore(coefficients,
                        rawScore, inputs));
                }
                return RawScores;
            },

            loadSexSpecificCoefficients: function (coefficients, inputs) {
                if (inputs.Female) {
                    coefficients.HeadScore = coefficients.FemaleHeadScore;
                    coefficients.UpperScore = coefficients.FemaleUpperScore;
                    coefficients.TrunkScore = coefficients.FemaleTrunkScore;
                    coefficients.LowerScore = coefficients.FemaleLowerScore;
                    coefficients.PasiTotalScore = coefficients.PASITot_female;
                } else {
                    coefficients.HeadScore = coefficients.MaleHeadScore;
                    coefficients.UpperScore = coefficients.MaleUpperScore;
                    coefficients.TrunkScore = coefficients.MaleTrunkScore;
                    coefficients.LowerScore = coefficients.MaleLowerScore;
                    coefficients.PasiTotalScore = coefficients.PASITot_male;
                }

                return coefficients;
            },

            /**
             * Converts the RAW values into percentages and matches values
             * based on their score to an appropriate score type.
             *
             * @param rawScores
             * @returns {Array}
             */
            convertNormalIndicatorToPercentagesResults: function (rawScores) {
                var _percentageBase = (rawScores[0]
                        + Math.pow(Math.E, rawScores[1])
                        + Math.pow(Math.E, rawScores[2])
                        + Math.pow(Math.E, rawScores[3])) / 100,
                    _math = new BodyAtlas.Utility.Math(),
                    _result = [];

                _result.push({ Value: this.scoreType().NOT_AT_ALL, Percentage: _math.roundTo3Decimals(rawScores[0] / _percentageBase) });
                _result.push({ Value: this.scoreType().A_LITTLE, Percentage: _math.roundTo3Decimals(Math.pow(Math.E, rawScores[1]) / _percentageBase) });
                _result.push({ Value: this.scoreType().A_LOT, Percentage: _math.roundTo3Decimals(Math.pow(Math.E, rawScores[2]) / _percentageBase) });
                _result.push({ Value: this.scoreType().VERY_MUCH, Percentage: _math.roundTo3Decimals(Math.pow(Math.E, rawScores[3]) / _percentageBase) });

                return _result;
            },

            /**
             * Converts the Quality of Life RAW values into a percentage
             *
             * @param rawScores
             * @returns {Number} percentage rounder to 3 decimal places
             */
            convertQOLNormalIndicatorToPercentageResults: function (rawScores) {
                var _math = new BodyAtlas.Utility.Math(),
                    zerosCalculation = 1.0 / (1.0 + Math.pow(Math.E, (-1 * rawScores[0]))),
                    countCalculation = Math.pow(Math.E, rawScores[1]);
                return _math.roundTo3Decimals((1 - zerosCalculation) * countCalculation);
            }
        };
    },

    DLQIAggregateCalculator: function () {
        "use strict";
        return {

            calculateAggreagateDLQI: function (individualResults) {
                var _QOLValue = 0,
                    _individualCalculator = new BodyAtlas.DLQI.DLQIIndividualPredictor(),
                    _math = new BodyAtlas.Utility.Math();
                _.each(individualResults, function (result) {
                    _QOLValue = _QOLValue + _.select(result, function (vo) {
                        return _.isEqual(vo.Value, parseInt(_individualCalculator.scoreType().VERY_MUCH, 10));
                    })[0].Percentage * (parseInt(_individualCalculator.scoreType().VERY_MUCH, 10) - 1) / 100;

                    _QOLValue = _QOLValue + _.select(result, function (vo) {
                        return _.isEqual(vo.Value, parseInt(_individualCalculator.scoreType().A_LOT, 10));
                    })[0].Percentage * (parseInt(_individualCalculator.scoreType().A_LOT, 10) - 1) / 100;

                    _QOLValue = _QOLValue + _.select(result, function (vo) {
                        return _.isEqual(vo.Value, parseInt(_individualCalculator.scoreType().A_LITTLE, 10));
                    })[0].Percentage * (parseInt(_individualCalculator.scoreType().A_LITTLE, 10) - 1) / 100;
                });

                _QOLValue = _math.roundTo1Decimal(_QOLValue);

                return _QOLValue;
            },

            determineQOLEffect: function (effect) {
                var result;
                if (effect <= 1) {
                    result =  "no effect";
                } else if (effect <= 5) {
                    result =  "A small effect";
                } else if (effect <= 10) {
                    result =  "A moderate effect";
                } else if (effect <= 20) {
                    result =  "A very large effect";
                } else {
                    result = "An extremely large effect";
                }
                return result;
            }
        };
    }
};
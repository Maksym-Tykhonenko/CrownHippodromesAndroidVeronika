const seasons = [
    {
        season: 'Spring',
        image: require('../assets/explain/1.png'),
        items: [
            {
                name: 'Ascot Racecourse (Berkshire)',
                image: require('../assets/seasons/spring/1.png'),
                coordinates: { lat: 51.4105, lon: 0.6751 },
                description: 'Ascot is one of the most prestigious racecourses in the UK, known for hosting the Royal Ascot meeting in June. The course is renowned for its royal connections and elegance, and it hosts a variety of races during spring, including the popular Spring Racing Weekend. The venue offers modern facilities alongside traditional grandstands.'        
            },
            {
                name: 'Newmarket Racecourse (Suffolk)',
                image: require('../assets/seasons/spring/2.png'),
                coordinates: { lat: 52.2371, lon: 0.3725 },
                description: 'Known as the birthplace of British horse racing, Newmarket is home to the historic 2,000 and 1,000 Guineas races in May. The course is situated in the heart of the horse racing world, with stables and training grounds nearby. The town is steeped in racing history, and the racecourse hosts various events in the spring.'        
            },
            {
                name: 'Aintree Racecourse (Liverpool)',
                image: require('../assets/seasons/spring/3.png'),
                coordinates: { lat: 53.4436, lon: 2.9657 },
                description: 'Famous for the Grand National, Aintree is located in Liverpool and hosts a variety of spring events leading up to the Grand National in April. Aintree is known for its tough, challenging jumps and has a rich history in the world of horse racing. It’s a top destination for racing fans in spring.'        
            },
        ]
    },
    {
        season: 'Summer',
        image: require('../assets/explain/2.png'),
        items: [
            {
                name: 'Goodwood Racecourse (West Sussex)',
                image: require('../assets/seasons/summer/1.png'),
                coordinates: { lat: 50.8597, lon: 0.7871 },
                description: 'Goodwood is set in the beautiful countryside of West Sussex and is known for its Glorious Goodwood Festival in August. The racecourse offers a mix of flat racing and exceptional hospitality, with stunning views of the South Downs. Summer racing here is a major highlight, attracting both locals and international visitors.'        
            },
            {
                name: 'Epsom Downs Racecourse (Surrey)',
                image: require('../assets/seasons/summer/2.png'),
                coordinates: { lat: 51.3249, lon: 0.2669 },
                description: 'Home to the famous Epsom Derby, this racecourse is situated on the scenic Epsom Downs in Surrey. The Derby, held in June, is one of the most prestigious flat races in the world. Epsom Downs offers a classic British racing experience with rich history, and the summer months are filled with exciting events leading up to the Derby.'        
            },
            {
                name: 'Sandown Park Racecourse (Surrey)',
                image: require('../assets/seasons/summer/3.png'),
                coordinates: { lat: 51.3587, lon: 0.2897 },
                description: 'Sandown Park, located in Esher, Surrey, is a popular venue for both flat and jump races. It’s well known for hosting the Eclipse Stakes in July, one of the major flat races. The venue is renowned for its beautiful parkland setting, providing a perfect atmosphere for summer racing.'        
            },
        ]
    },
    {
        season: 'Autumn',
        image: require('../assets/explain/3.png'),
        items: [
            {
                name: 'Doncaster Racecourse (South Yorkshire)',
                image: require('../assets/seasons/autumn/1.png'),
                coordinates: { lat: 53.5222, lon: 1.1244 },
                description: 'Doncaster is home to the historic St. Leger Festival, held in September. The racecourse is one of the oldest in the country and has a strong autumn racing tradition. Known for its top-class facilities, Doncaster is a key destination for racing fans in the autumn months.'        
            },
            {
                name: 'York Racecourse (North Yorkshire)',
                image: require('../assets/seasons/autumn/2.png'),
                coordinates: { lat: 53.9591, lon: 1.0816 },
                description: 'York Racecourse is one of the most popular tracks in the UK, hosting the prestigious Ebor Festival each August. In the autumn, the venue continues to attract large crowds for high-quality racing. York has a rich racing history and beautiful surroundings, making it a must-visit venue for autumn racing enthusiasts.'        
            },
            {
                name: 'Newbury Racecourse (Berkshire)',
                image: require('../assets/seasons/autumn/3.png'),
                coordinates: { lat: 51.3983, lon: 1.3234 },
                description: 'Newbury Racecourse is famous for its Hennessy Gold Cup, one of the biggest events in British jump racing, held every November. The venue hosts a variety of autumn racing events, including both flat and jump races. With a rich history and excellent facilities, it’s a top choice for autumn racing.'        
            },
        ]
    },
    {
        season: 'Winter',
        image: require('../assets/explain/4.png'),
        items: [
            {
                name: 'Kempton Park Racecourse (Surrey)',
                image: require('../assets/seasons/winter/1.png'),
                coordinates: { lat: 51.4050, lon: 0.2875 },
                description: 'Kempton Park is a key winter racecourse, known for hosting the prestigious King George VI Chase on Boxing Day. It is one of the top venues for jump racing during the winter season. The racecourse is easily accessible from London, making it a popular choice for winter sports enthusiasts.'        
            },
            {
                name: 'Cheltenham Racecourse (Gloucestershire)',
                image: require('../assets/seasons/winter/2.png'),
                coordinates: { lat: 51.9263, lon: 2.0736 },
                description: 'Although Cheltenham is best known for its Festival in March, it hosts important winter meetings, including the International Hurdle in December. Located in the Cotswolds, it is an iconic venue in British racing, especially for jump races during the colder months.'        
            },
            {
                name: 'Ludlow Racecourse (Shropshire)',
                image: require('../assets/seasons/winter/3.png'),
                coordinates: { lat: 52.3522, lon: 2.7167 },
                description: 'A charming venue offering a great atmosphere for winter jump racing. Ludlow Racecourse hosts numerous winter events, perfect for those seeking a quieter but exciting racing experience. It is known for its beautiful rural setting and strong winter racing tradition.'        
            },
        ]
    },
];

export default seasons;
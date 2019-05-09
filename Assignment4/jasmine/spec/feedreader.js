/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         //console.log(allFeeds);

        it('URL is deinfed',function(){
            for (let feed in allFeeds){
                //console.log(feed);
                expect(allFeeds[feed].url).toBeDefined();
                expect(allFeeds[feed].url.length).toBeGreaterThan(0);
            }
                
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name is deinfed',function(){
            for (let feed in allFeeds){
                //console.log(feed);
                expect(allFeeds[feed].name).toBeDefined();
                expect(allFeeds[feed].name.length).toBeGreaterThan(0);
            }
                
         });

    });

    describe('The menu', function() {
    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('menu is hidden',function(){
            
            expect($('body').hasClass('menu-hidden')).toBe(true);
                
         });


         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('menu change by click',function(){
            
            let menu = document.querySelector('.menu-icon-link');
            //console.log(menu);
            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menu.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);

                
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        it ('at least a single entry element', function(done){
            //let entry = document.querySelector('.entry-link');
            //console.log(entry);
            
            //expect(entry).not.toEqual(null);

            expect($('.feed .entry').length).toBeGreaterThan(0);

            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        let feed0;
        let feed1; 

        beforeEach(function(done){

            /*
            loadFeed(1, function(){
                feed0 = document.querySelector('.feed');
                done();
            });

            loadFeed(0, function(){
                feed1 = document.querySelector('.feed');
                done();
            });
            */

            loadFeed(0,function(){
                feed0 = document.querySelector('.feed').innerHTML;
                loadFeed(1,done);
            });

        });


        it ('feeds are different', function(done){
            
            feed1 = document.querySelector('.feed').innerHTML;

            console.log('feed0');
            console.log(feed0);
            console.log('feed1');
            console.log(feed1);
            
            expect(feed0).not.toEqual(feed1);
            done();
        });


    });

}());

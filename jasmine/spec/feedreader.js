$(function() {
    describe('RSS Feeds', function() {
        //Ensures allFeeds is defined and is not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Ensures each feed has a url and it is not empty
        it('has URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        //Ensures each feed has a name and it is not empty
        it('has a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {
        //Ensures the menu is hidden by default
        it('is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

         //Ensures the menu switches from visibile to not visible when the menu icon is clicked
        it('toggles visibility', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {
        //Ensures there is at least one .entry within the .feed container after the loadFeed function is finished
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('exist', function(done) {
            var entries = $('.feed').find('.entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        //Ensures when a new feed is loaded by the loadFeed function that the content actually changes
        //Grabs all the text in the feed and headers
        var content = $('.feed, h1.header-title').text();
        //Starts the function with index 1 to finish in index 0 and therefore not have to reset the function again
        beforeEach(function(done) {
            loadFeed(1, function() {
                loadFeed(0, done);
            });
        });
        
        //compares the two contents and makes sure they are different
        it('has new content', function(done) {
            expect($('.feed, h1.header-title').text()).not.toBe(content);
            done();
        });
    });
}());
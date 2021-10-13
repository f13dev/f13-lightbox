(function($) {
    var clicked;

    $(document).on('click', '.f13-lightbox', function(e) {
        f13_lightbox_event($(this));
        clicked = $(this);
    });

    $(document).on('click', '#f13-lightbox-close', function() {
        $('#f13-lightbox-overlay').remove();
        $('body').css('overflow-y', 'auto');
        clicked.focus();
    });

    $(document).on('click', '.f13-lightbox-nav', function() {
        var current = $(this).data('sequence');
        var count = $('#f13-lightbox-image').data('total');
        var next = next_sequence(current, count);
        var prev = prev_sequence(current, count);
        var obj = get_image(current);
        $('#f13-lightbox-next').data('sequence', next);
        $('#f13-lightbox-prev').data('sequence', prev);
        $('#f13-lightbox-image').attr('src', obj.attr('src'));
        $('#f13-lightbox-alt').html(caption(obj.attr('alt'), current, count));
    });

    $(document).keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            var elem = $(':focus');
            if (elem.hasClass('f13-lightbox') || elem.hasClass('f13-lightbox-controls')) {
                elem.click();
                if (elem.hasClass('f13-lightbox')) {
                    clicked = elem;
                }
            }
        }
    });

    function caption(alt, current, count) {
        return 'Image '+current+' of '+count+' "'+alt+'"';
    }

    function count_objects(obj) {
        var count = 0;
        $('img[data-f13-lightbox]').each(function(i, el) {
            count++;
        });

        return count;
    }

    function f13_lightbox_event(obj) {
        $('body').css('overflow-y', 'hidden');
        var count = count_objects(obj);
        var next_obj = next_sequence(obj.data('f13-lightbox-sequence'), count);
        var prev_obj = prev_sequence(obj.data('f13-lightbox-sequence'), count);

        var close = '<span id="f13-lightbox-close" title="Close" tabindex="0" class="f13-lightbox-controls"></span>';
        var next = '<span id="f13-lightbox-next" class="f13-lightbox-nav f13-lightbox-controls" data-sequence="'+next_obj+'" title="Next" tabindex="0"></span>';
        var prev = '<span id="f13-lightbox-prev" class="f13-lightbox-nav f13-lightbox-controls" data-sequence="'+prev_obj+'" title="Previous" tabindex="0"></span>';
        var image = '<img id="f13-lightbox-image" src="'+obj.attr('src')+'" data-total="'+count+'" data-sequence="'+obj.data('f13-lightbox-sequence')+'">';
        var alt = '<span id="f13-lightbox-alt">'+caption(obj.attr('alt'), obj.data('f13-lightbox-sequence'), count)+'</span>'
        var container = '<div id="f13-lightbox-container">'+image+alt+close+next+prev+'</div>'
        var overlay = '<div id="f13-lightbox-overlay">'+container+'</div>';
        $('body').append(overlay);

        const restrict = document.querySelector('#f13-lightbox-overlay');
        const first = restrict.querySelectorAll('.f13-lightbox-controls')[0];
        const focusable = restrict.querySelectorAll('.f13-lightbox-controls');
        const last = focusable[focusable.length - 1];

        document.addEventListener('keydown', function(e) {
            let tab = e.key === 'Tab' || e.keyCode === 9;
            if (!tab) { return; }
            if (e.shiftKey) {
                if (document.activeElement === first) { last.focus(); e.preventDefault(); }
            } else {
                if (document.activeElement === last) { first.focus(); e.preventDefault(); }
            }
        });

        $('#f13-lightbox-next').focus();
    }

    function get_image(sequence) {
        var obj = '';
        $('.f13-lightbox').each(function() {
            if ($(this).data('f13-lightbox-sequence') == sequence) {
                obj = $(this);
                return;
            }
        });
        return obj;
    }

    function next_sequence(current, count) {
        var next_obj = current + 1;
        if (next_obj > count) { next_obj = 1; }

        return next_obj;
    }

    function prev_sequence(current, count) {
        var prev_obj = current - 1;
        if (prev_obj == 0) { prev_obj = count; }

        return prev_obj;
    }
})(jQuery);
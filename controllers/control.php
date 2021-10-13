<?php namespace F13\Lightbox\Controllers;

class Control
{
    public function __construct()
    {
        add_filter('the_content', array($this, 'find_and_replace'), 100);
        add_filter('the_excerpt', array($this, 'find_and_replace'), 100);
    }

    public function find_and_replace($content)
    {

        global $post;
        $pattern = "/<img([^\>]*?)>/i";
        $count = 1;
        if (preg_match_all($pattern, $content, $img)) {
            foreach ($img[0] as $tag) {
                if (!preg_match('/f13-lightbox-/i', $tag) && !preg_match('/no-lightbox/i', $tag)) {
                    if (!preg_match('/class=/i', $tag)) {
                        $the_pattern = $pattern;
                        $tag_format = '<img class="f13-lightbox" data-f13-lightbox="'.$post->ID.'" data-f13-lightbox-sequence="'.$count.'" aria-label="Enlarge image '.$count.'" tabindex="0" $1>';
                    }
                    else {
                        $the_pattern = "/<img(.*?)class=('|\")([A-Za-z0-9 \/_\.\~\:-]*?)('|\")([^\>]*?)>/i";
                        $tag_format = '<img$1class=$2$3 f13-lightbox$4$5 data-f13-lightbox="'.$post->ID.'" aria-label="Enlarge image '.$count.'" data-f13-lightbox-sequence="'.$count.'" tabindex="0">';
                    }
                    $count++;
                    $new_tag = preg_replace($the_pattern, $tag_format, $tag);
                    $content = str_replace($tag, $new_tag, $content);
                }
            }
        }
        return $content;
    }
}
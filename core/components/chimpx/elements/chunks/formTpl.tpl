                    <form action="[[~[[*id]]]]" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate">

                        <fieldset>
                            <label for="mc_EMAIL">Your Email</label>
                            <input type="text" value="" name="mc_EMAIL" class="required email" id="mc_EMAIL" />

                            <span>[[+MailChimp.success]][[+MailChimp.error]]</span>

                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn" />
                        </fieldset>
                    </form>
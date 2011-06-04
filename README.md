## Chimpx

Chimpx is a MailChimp integration with MODX Revolution.

## How to install

From MODX Provider:
Install package manager & follow the instructions

Manually:
* put the transport package into core/packages/
* go to the package manager, hit "add new package"
* search locally for packages
* install from the package grid

## Configuration

While installing, you'll be prompted to enter you MailChimp API key
(see http://kb.mailchimp.com/article/where-can-i-find-my-api-key/)

You can safely skip this during the install and set/change you API key later
by going into the system settings (key = chimpx.apikey).

## Information

This is the first steps hopefully leading to a "full" MailChimp integration
for MODX Revolution (2.1+).

At this time you can :
* create a campaign from a MODX resource
* update some campaign details
* delete any campaign (saved or already sent)
* replicate an existing campaign

## Copyright Information

Chimpx is distributed as GPL (as MODx Revolution is), but the copyright owner
(Romain Tripault) grants all users of Chimpx the ability to modify, distribute
and use Chimpx in MODx development as they see fit, as long as attribution
is given somewhere in the distributed source of all derivative works.
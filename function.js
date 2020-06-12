function calculateArmorDmgNet(armour, hit_dmg)
{
    return Math.max(0.1 * hit_dmg, Math.round(((10 * hit_dmg * hit_dmg) / (armour + (10 * hit_dmg)))));
}
function calculateResDmg(hit_dmg, res)
{
    return Math.round((hit_dmg * (1 - (res / 100))))
}

function calcReducedDamage(hit_dmg, res, armour, isTranscended, type)
{
    dmg_after_res = calculateResDmg(hit_dmg, res)
    if(isNaN(res))
    {
        final_str =  "Enter a valid value for " + type + " resistance."
        return final_str
    }
    if(res > 90)
    {
        final_str = "Maximum resistances are hard capped at 90%. Enter a value less than or equal to 90."
        return final_str
    }
    if(isTranscended)
    {
        dmg_after_res = calculateArmorDmgNet(armour, dmg_after_res)
    }
    dmg_diff = hit_dmg - dmg_after_res
    dmg_percent = 100*((dmg_diff)/(hit_dmg))
    final_str = "Negated " + parseFloat(dmg_diff).toFixed(2) + " " + type + " damage. You reduced approximately " + parseFloat(dmg_percent).toFixed(2) + "% " + type + " damage."
    health = parseFloat(document.getElementById('health').value)
    if(!isNaN(health) && health < dmg_after_res){
        final_str += "\n This hit will be lethal for your character."
    }
    return final_str
}

function calculateEleArmorDmg(hit_dmg, res, armour, isTranscended, type)
{
    hit_dmg_after_res = calculateResDmg(hit_dmg, res)
    damage_after_armour = calculateArmorDmgNet(armour, hit_dmg_after_res)
    final_str = ""
    if(isNaN(res))
    {
        final_str = "Enter a valid value for " + type + " resistance."
    }
    if(res > 90)
    {
        final_str = "Maximum resistances are hard capped at 90%. Enter a value less than or equal to 90."
        return final_str
    }
    else if(isTranscended)
    {
        final_str = final_str + "You would need approx. " + Math.floor(damage_after_armour) + " health to survive a " + Math.floor(hit_dmg) +" " + type + " damage hit."
    }
    else
    {
        final_str = final_str + "You would need approx. " + Math.floor(hit_dmg_after_res) + " health to survive a " + Math.floor(hit_dmg) + " " + type + " damage hit."
    }
    return final_str
}
function healthfromhit()
{
    hit_dmg = parseFloat(document.getElementById("damage_hit").value);
    armour = parseFloat(document.getElementById("armour").value);
    isTranscended = document.getElementById("Transcendence").checked;
    dmg_choices = document.getElementById("damage_type");
    dmg_type = dmg_choices.options[dmg_choices.selectedIndex].value;
    final_str = ""
    if(isNaN(hit_dmg) || (isTranscended && isNaN(armour))){
        final_str = "Enter a valid value for armour and damaging hit."
    }
    else if(dmg_type == "Physical")
    {
        damage_after_armour = calculateArmorDmgNet(armour, hit_dmg)
        if(isTranscended){
            final_str = final_str + "You would need " + hit_dmg + " health to survive a " + hit_dmg +" physical damage hit."
        }
        else{
            final_str = final_str + "You would need " + Math.floor(damage_after_armour) + " health to survive a " + hit_dmg +" physical damage hit."
        }
    }
    else if(dmg_type == "Fire")
    {
        fire_res = parseFloat(document.getElementById("fire_res").value)
        final_str = calculateEleArmorDmg(hit_dmg, fire_res, armour, isTranscended, dmg_type)
    }
    else if(dmg_type == "Cold")
    {
        cold_res = parseFloat(document.getElementById("cold_res").value)
        final_str = calculateEleArmorDmg(hit_dmg, cold_res, armour, isTranscended, dmg_type)
    }
    else if(dmg_type == "Lightning")
    {
        lightning_res = parseFloat(document.getElementById("lightning_res").value)
        final_str = calculateEleArmorDmg(hit_dmg, lightning_res, armour, isTranscended, dmg_type)
    }
    document.getElementById("toFill").innerHTML = final_str
    return false;
}

function dmgfromhit()
{
    hit_dmg = parseFloat(document.getElementById("damage_hit").value);
    armour = parseFloat(document.getElementById("armour").value);
    isTranscended = document.getElementById("Transcendence").checked;
    dmg_choices = document.getElementById("damage_type");
    dmg_type = dmg_choices.options[dmg_choices.selectedIndex].value;
    final_str = ""
    console.log("in dmg_hit")
    if(isNaN(hit_dmg) || (isTranscended && isNaN(armour))){
        final_str = "Enter a valid armour and hit damage value"
    }
    else if(dmg_type == "Physical")
    {
        damage_after_armour = calculateArmorDmgNet(armour, hit_dmg)
        if(isTranscended){
            final_str = "Since you have transcendence allocated, your armour does not reduce physical damage anymore."
        }
        else
        {
            dmg_diff = parseFloat(hit_dmg - damage_after_armour).toFixed(2)
            dmg_percent = parseFloat(100*(dmg_diff/hit_dmg)).toFixed(2)
            final_str = "Negated " + dmg_diff + " " + dmg_type + " damage. You reduced approximately " + dmg_percent + "% " + dmg_type + " damage."
        }
    }
    else if(dmg_type == "Fire")
    {
        fire_res = parseFloat(document.getElementById("fire_res").value)
        final_str = calcReducedDamage(hit_dmg, fire_res, armour, isTranscended, dmg_type)
    }
    else if(dmg_type == "Cold")
    {
        cold_res = parseFloat(document.getElementById("cold_res").value)
        final_str = calcReducedDamage(hit_dmg, cold_res, armour, isTranscended, dmg_type)
    }
    else if(dmg_type == "Lightning"){
        lightning_res = parseFloat(document.getElementById("lightning_res").value)
        final_str = calcReducedDamage(hit_dmg, lightning_res, armour, isTranscended, dmg_type)
        
    }
    document.getElementById("toFill").innerHTML = final_str
    return false;
}

function hit_from_health(health, armour){
    // Math to solve the quadratic equation.
    // discriminant = Math.pow(10 * health, 2) - (4 * 10 * (armour * health * -1))
    // root1 = ((-1 * (-1 * 10 * health)) + Math.sqrt(discriminant)) / (2 * 10)
    // root2 = ((-1 * (-1 * 10 * health)) - Math.sqrt(discriminant)) / (2 * 10)
    // The above reduces in its simplest form below.
    solution = (1/10) * ( (5*health) + (Math.sqrt(5)*Math.sqrt( (5*health*health) + (2*armour*health))))
    return solution
}

function handleElements(res, health, dmg_type, armour)
{
    final_str = ""
    if(isNaN(res))
        {
            final_str = "Enter a valid value for " + dmg_type +" resistance"
        }
    else if(isTranscended)
    {
        if(isNaN(armour))
        {
            final_str = "Enter a valid value for armour"
        }
        else
        {
            solution = hit_from_health(health, armour)
            solution = solution / (1 - res)
            final_str = "You can take at most " + Math.round(solution).toFixed(2) + " " + dmg_type + " damage."
        }
    }
    else
    {
        max_health = health / (1 - res)
        final_str = "You can take at most " + max_health.toFixed(2) + " " + dmg_type + " damage."
    }
    return final_str
}
function handle_health_calcs(health, armour, isTranscended, dmg_type)
{
    final_str = ""
    if(dmg_type == "Physical")
    {
        if(isNaN(armour)){
            final_str = "Enter a valid value for armour"
        }
        else{
            solution = hit_from_health(health, armour)
            final_str = "You can take at most " + Math.round(solution).toFixed(2) + " " + dmg_type + " damage."
        }
    }
    else if(dmg_type == "Fire")
    {
        fire_res = parseFloat(document.getElementById("fire_res").value) / 100
        final_str = handleElements(fire_res, health, dmg_type, armour)
    }
    else if(dmg_type == "Cold")
    {
        cold_res = parseFloat(document.getElementById("cold_res").value) / 100
        final_str = handleElements(fire_res, health, dmg_type, armour)
    }
    else if(dmg_type == "Lightning")
    {
        lightning_res = parseFloat(document.getElementById("lightning_res").value) / 100
        final_str = handleElements(lightning_res, health, dmg_type, armour)
    }
    return final_str
}

function max_dmg_hit()
{
    // alert("in max_dmg_hit")
    health = parseFloat(document.getElementById("health").value);
    armour = parseFloat(document.getElementById("armour").value);
    isTranscended = document.getElementById("Transcendence").checked;
    dmg_choices = document.getElementById("damage_type");
    dmg_type = dmg_choices.options[dmg_choices.selectedIndex].value;
    final_str = ""
    if(isNaN(health))
    {
        final_str += "Please enter a valid value for health"
    }
    else if(isTranscended && dmg_type == "Physical")
    {
        final_str += "You can take at most " + health + " "
        final_str += dmg_type + " damage."
    }
    else
    {
        final_str = handle_health_calcs(health, armour, isTranscended, dmg_type)
    }
    document.getElementById("toFill").innerHTML = final_str;
    // Test push
} 